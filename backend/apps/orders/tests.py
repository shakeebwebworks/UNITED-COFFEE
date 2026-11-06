from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from apps.catalog.models import Category, Product

User = get_user_model()

REGISTER = {
    'name': 'Test User',
    'email': 'test@example.com',
    'phone': '9876543210',
    'password': 'Coffee@12345',
}

ORDER = {
    'name': 'Test User',
    'phone': '9876543210',
    'address': '12 Test Street',
    'city': 'Mumbai',
    'pincode': '400050',
    'payment': 'cod',
}


class ApiFlowTests(APITestCase):
    def setUp(self):
        cat = Category.objects.create(name='Espresso')
        self.p1 = Product.objects.create(category=cat, name='Signature Shot', price=200)
        self.p2 = Product.objects.create(category=cat, name='Hidden Blend', price=100, is_active=False)

    def auth(self, payload=None):
        res = self.client.post('/api/auth/register/', payload or REGISTER, format='json')
        self.assertEqual(res.status_code, 201)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + res.data['access'])
        return res

    def test_register_login_me(self):
        self.auth()
        self.client.credentials()
        login = self.client.post(
            '/api/auth/login/',
            {'email': REGISTER['email'], 'password': REGISTER['password']},
            format='json',
        )
        self.assertEqual(login.status_code, 200)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + login.data['access'])
        me = self.client.get('/api/auth/me/')
        self.assertEqual(me.status_code, 200)
        self.assertEqual(me.data['email'], REGISTER['email'])

    def test_duplicate_email_rejected(self):
        self.auth()
        self.client.credentials()
        res = self.client.post('/api/auth/register/', REGISTER, format='json')
        self.assertEqual(res.status_code, 400)

    def test_weak_password_rejected(self):
        res = self.client.post('/api/auth/register/', {**REGISTER, 'password': '12345678'}, format='json')
        self.assertEqual(res.status_code, 400)

    def test_wrong_login_rejected(self):
        self.auth()
        self.client.credentials()
        res = self.client.post(
            '/api/auth/login/', {'email': REGISTER['email'], 'password': 'wrong-pass-1'}, format='json'
        )
        self.assertEqual(res.status_code, 401)

    def test_products_public_search_and_hidden(self):
        res = self.client.get('/api/products/')
        self.assertEqual(res.status_code, 200)
        names = [p['name'] for p in res.data['results']]
        self.assertIn('Signature Shot', names)
        self.assertNotIn('Hidden Blend', names)
        found = self.client.get('/api/products/?search=signature')
        self.assertEqual(len(found.data['results']), 1)
        cat = self.client.get('/api/products/?category=espresso')
        self.assertEqual(len(cat.data['results']), 1)

    def test_cart_requires_login(self):
        self.assertEqual(self.client.get('/api/cart/').status_code, 401)
        self.assertEqual(self.client.get('/api/orders/').status_code, 401)

    def test_cart_flow(self):
        self.auth()
        add = self.client.post('/api/cart/items/', {'product_id': self.p1.id, 'quantity': 2}, format='json')
        self.assertEqual(add.status_code, 201)
        self.assertEqual(add.data['count'], 2)
        self.assertEqual(add.data['subtotal'], 400)
        item_id = add.data['items'][0]['id']
        upd = self.client.patch(f'/api/cart/items/{item_id}/', {'quantity': 5}, format='json')
        self.assertEqual(upd.data['subtotal'], 1000)
        rem = self.client.delete(f'/api/cart/items/{item_id}/')
        self.assertEqual(rem.data['count'], 0)

    def test_cannot_add_inactive_product(self):
        self.auth()
        res = self.client.post('/api/cart/items/', {'product_id': self.p2.id, 'quantity': 1}, format='json')
        self.assertEqual(res.status_code, 400)

    def test_order_totals_computed_on_server(self):
        self.auth()
        res = self.client.post(
            '/api/orders/',
            {**ORDER, 'items': [{'product_id': self.p1.id, 'quantity': 2}]},
            format='json',
        )
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.data['totals']['subtotal'], 400)
        self.assertEqual(res.data['totals']['delivery'], 49)
        self.assertEqual(res.data['totals']['tax'], 20)
        self.assertEqual(res.data['totals']['total'], 469)
        self.assertEqual(res.data['status'], 'Pending')

    def test_free_delivery_over_threshold(self):
        self.auth()
        res = self.client.post(
            '/api/orders/',
            {**ORDER, 'items': [{'product_id': self.p1.id, 'quantity': 5}]},
            format='json',
        )
        self.assertEqual(res.data['totals']['delivery'], 0)
        self.assertEqual(res.data['totals']['total'], 1050)

    def test_order_validation(self):
        self.auth()
        items = [{'product_id': self.p1.id, 'quantity': 1}]
        bad_pin = self.client.post('/api/orders/', {**ORDER, 'pincode': '12', 'items': items}, format='json')
        self.assertEqual(bad_pin.status_code, 400)
        empty = self.client.post('/api/orders/', {**ORDER, 'items': []}, format='json')
        self.assertEqual(empty.status_code, 400)
        inactive = self.client.post(
            '/api/orders/',
            {**ORDER, 'items': [{'product_id': self.p2.id, 'quantity': 1}]},
            format='json',
        )
        self.assertEqual(inactive.status_code, 400)

    def test_orders_are_private_per_user(self):
        self.auth()
        created = self.client.post(
            '/api/orders/',
            {**ORDER, 'items': [{'product_id': self.p1.id, 'quantity': 1}]},
            format='json',
        )
        number = created.data['id']
        self.client.credentials()
        self.auth({**REGISTER, 'email': 'other@example.com'})
        self.assertEqual(len(self.client.get('/api/orders/').data), 0)
        self.assertEqual(self.client.get(f'/api/orders/{number}/').status_code, 404)

    def test_contact_and_newsletter(self):
        bad = self.client.post('/api/contact/', {'name': 'A', 'email': 'x', 'message': 'short'}, format='json')
        self.assertEqual(bad.status_code, 400)
        ok = self.client.post(
            '/api/contact/',
            {'name': 'Aisha', 'email': 'a@example.com', 'subject': 'Hi', 'message': 'Hello United Coffee team'},
            format='json',
        )
        self.assertEqual(ok.status_code, 201)
        sub = self.client.post('/api/newsletter/', {'email': 'news@example.com'}, format='json')
        self.assertEqual(sub.status_code, 201)
        again = self.client.post('/api/newsletter/', {'email': 'news@example.com'}, format='json')
        self.assertEqual(again.status_code, 200)
        bad_mail = self.client.post('/api/newsletter/', {'email': 'nope'}, format='json')
        self.assertEqual(bad_mail.status_code, 400)