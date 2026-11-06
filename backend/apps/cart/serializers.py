from rest_framework import serializers

from apps.catalog.models import Product
from apps.catalog.serializers import ProductSerializer

from .models import CartItem


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    line_total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'quantity', 'line_total')

    def get_line_total(self, obj):
        return obj.product.price * obj.quantity


class CartItemInputSerializer(serializers.Serializer):
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.filter(is_active=True), source='product'
    )
    quantity = serializers.IntegerField(min_value=1, max_value=20, default=1)


class QuantitySerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=1, max_value=20)