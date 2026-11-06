from django.conf import settings
from django.db import models
from django.utils.crypto import get_random_string

from apps.catalog.models import Product


class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Preparing', 'Preparing'),
        ('Out for Delivery', 'Out for Delivery'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]
    PAYMENT_CHOICES = [
        ('cod', 'Cash on Delivery'),
        ('upi', 'UPI on Delivery'),
        ('card', 'Card on Delivery'),
    ]

    order_number = models.CharField(max_length=20, unique=True, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    city = models.CharField(max_length=80)
    pincode = models.CharField(max_length=6)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_CHOICES, default='cod')
    notes = models.TextField(blank=True)

    subtotal = models.PositiveIntegerField(default=0)
    delivery_fee = models.PositiveIntegerField(default=0)
    tax = models.PositiveIntegerField(default=0)
    total = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.order_number:
            while True:
                number = 'UC' + get_random_string(7, '0123456789')
                if not Order.objects.filter(order_number=number).exists():
                    self.order_number = number
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return self.order_number


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=150)
    price = models.PositiveIntegerField()
    quantity = models.PositiveSmallIntegerField()

    def __str__(self):
        return f'{self.name} x {self.quantity}'