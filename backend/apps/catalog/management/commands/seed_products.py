from django.core.management.base import BaseCommand

from apps.catalog.models import Category, Product


def u(photo_id):
    return f'https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w=800&q=80'


CATEGORIES = ['Espresso', 'Milk Coffee', 'Cold Coffee', 'Beans']

PRODUCTS = [
    dict(name='Signature Espresso', category='Espresso', price=180, rating=4.9, reviews=214,
         image='photo-1510707577719-ae7c14805e3a', featured=True, best=True,
         notes='Dark chocolate, Caramel, Hazelnut',
         description='Our house blend pulled long and slow. Rich crema, deep body and a clean, sweet finish.'),
    dict(name='Velvet Cappuccino', category='Milk Coffee', price=240, rating=4.8, reviews=189,
         image='photo-1495474472287-4d71bcdd2085', featured=True, best=True,
         notes='Cocoa, Vanilla, Toasted almond',
         description='Double ristretto with silky microfoam and a signature pour of latte art.'),
    dict(name='Golden Flat White', category='Milk Coffee', price=260, rating=4.9, reviews=162,
         image='photo-1514432324607-a09d9b4aefdd', featured=True, best=False,
         notes='Honey, Brown sugar, Milk chocolate',
         description='A velvety flat white with a touch of honey-sweet crema, made with single-origin beans.'),
    dict(name='Nitro Cold Brew', category='Cold Coffee', price=290, rating=4.7, reviews=131,
         image='photo-1517701550927-30cf4ba1dba5', featured=True, best=True,
         notes='Dark cherry, Cocoa nibs, Molasses',
         description='Steeped for 18 hours and infused with nitrogen for a smooth, cascading pour.'),
    dict(name='Iced Hazelnut Latte', category='Cold Coffee', price=270, rating=4.6, reviews=97,
         image='photo-1461023058943-07fcbe16d735', featured=False, best=True,
         notes='Hazelnut, Cream, Roasted nuts',
         description='Chilled espresso over ice with house-made hazelnut syrup and cold milk.'),
    dict(name='Ethiopian Yirgacheffe 250g', category='Beans', price=780, rating=4.9, reviews=76,
         image='photo-1447933601403-0c6688de566e', featured=False, best=False,
         notes='Jasmine, Bergamot, Peach',
         description='Washed single-origin beans, light roast. Bright, floral and tea-like.'),
    dict(name='Colombian Huila 250g', category='Beans', price=720, rating=4.8, reviews=64,
         image='photo-1442512595331-e89e73853f31', featured=False, best=False,
         notes='Red apple, Panela, Almond',
         description='Medium roast beans with a juicy sweetness and a balanced, round cup.'),
    dict(name='Doppio Ristretto', category='Espresso', price=220, rating=4.7, reviews=85,
         image='photo-1509042239860-f550ce710b93', featured=False, best=False,
         notes='Dark berry, Bitter cocoa, Spice',
         description='A concentrated double shot, short and intense, for those who like it bold.'),
]


class Command(BaseCommand):
    help = 'Seed United Coffee categories and products.'

    def handle(self, *args, **options):
        cats = {}
        for pos, name in enumerate(CATEGORIES):
            cat, _ = Category.objects.update_or_create(name=name, defaults={'position': pos})
            cats[name] = cat

        for p in PRODUCTS:
            Product.objects.update_or_create(
                name=p['name'],
                defaults={
                    'category': cats[p['category']],
                    'price': p['price'],
                    'rating': p['rating'],
                    'reviews_count': p['reviews'],
                    'image_url': u(p['image']),
                    'description': p['description'],
                    'tasting_notes': p['notes'],
                    'is_featured': p['featured'],
                    'is_best_seller': p['best'],
                    'is_active': True,
                },
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(CATEGORIES)} categories and {len(PRODUCTS)} products.'))