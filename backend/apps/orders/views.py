from collections import defaultdict

from django.db import transaction
from rest_framework import generics, permissions, serializers
from rest_framework.response import Response

from apps.catalog.models import Product

from .models import Order, OrderItem
from .serializers import OrderCreateSerializer, OrderSerializer

FREE_DELIVERY_ABOVE = 999
DELIVERY_FEE = 49


class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items')

    def create(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        wanted = defaultdict(int)
        for line in data['items']:
            wanted[line['product_id']] += line['quantity']

        with transaction.atomic():
            products = {p.id: p for p in Product.objects.filter(id__in=list(wanted), is_active=True)}
            if len(products) != len(wanted):
                raise serializers.ValidationError({'items': 'One or more items are no longer available.'})

            subtotal = sum(products[pid].price * qty for pid, qty in wanted.items())
            delivery = 0 if subtotal >= FREE_DELIVERY_ABOVE else DELIVERY_FEE
            tax = (subtotal * 5 + 50) // 100

            order = Order.objects.create(
                user=request.user,
                name=data['name'],
                phone=data['phone'],
                address=data['address'],
                city=data['city'],
                pincode=data['pincode'],
                payment_method=data['payment'],
                notes=data.get('notes', ''),
                subtotal=subtotal,
                delivery_fee=delivery,
                tax=tax,
                total=subtotal + delivery + tax,
            )
            OrderItem.objects.bulk_create([
                OrderItem(
                    order=order,
                    product=products[pid],
                    name=products[pid].name,
                    price=products[pid].price,
                    quantity=qty,
                )
                for pid, qty in wanted.items()
            ])

        return Response(OrderSerializer(order).data, status=201)


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'order_number'

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items')