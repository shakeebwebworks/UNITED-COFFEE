from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Cart, CartItem
from .serializers import CartItemInputSerializer, CartItemSerializer, QuantitySerializer


def get_cart(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart


def cart_payload(cart, request):
    items = list(cart.items.select_related('product__category').order_by('id'))
    return {
        'items': CartItemSerializer(items, many=True, context={'request': request}).data,
        'subtotal': sum(i.product.price * i.quantity for i in items),
        'count': sum(i.quantity for i in items),
    }


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(cart_payload(get_cart(request.user), request))

    def delete(self, request):
        cart = get_cart(request.user)
        cart.items.all().delete()
        return Response(cart_payload(cart, request))


class CartItemAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CartItemInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data['product']
        qty = serializer.validated_data['quantity']
        cart = get_cart(request.user)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product, defaults={'quantity': qty})
        if not created:
            item.quantity = min(20, item.quantity + qty)
            item.save(update_fields=['quantity'])
        return Response(cart_payload(cart, request), status=201)


class CartItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        item = get_object_or_404(CartItem, pk=pk, cart__user=request.user)
        serializer = QuantitySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        item.quantity = serializer.validated_data['quantity']
        item.save(update_fields=['quantity'])
        return Response(cart_payload(item.cart, request))

    def delete(self, request, pk):
        item = get_object_or_404(CartItem, pk=pk, cart__user=request.user)
        cart = item.cart
        item.delete()
        return Response(cart_payload(cart, request))