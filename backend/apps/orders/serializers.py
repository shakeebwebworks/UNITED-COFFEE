from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemInputSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, max_value=20)


class OrderCreateSerializer(serializers.Serializer):
    name = serializers.CharField(min_length=2, max_length=120)
    phone = serializers.RegexField(r'^[0-9+\-\s]{10,15}$', error_messages={'invalid': 'Enter a valid phone number.'})
    address = serializers.CharField(min_length=6, max_length=300)
    city = serializers.CharField(max_length=80)
    pincode = serializers.RegexField(r'^[0-9]{6}$', error_messages={'invalid': 'Enter a 6-digit pincode.'})
    payment = serializers.ChoiceField(choices=['cod', 'upi', 'card'])
    notes = serializers.CharField(required=False, allow_blank=True, max_length=500)
    items = OrderItemInputSerializer(many=True, allow_empty=False)


class OrderItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    qty = serializers.IntegerField(source='quantity')

    class Meta:
        model = OrderItem
        fields = ('id', 'name', 'price', 'qty')

    def get_id(self, obj):
        return obj.product_id or obj.pk


class OrderSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='order_number')
    createdAt = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    totals = serializers.SerializerMethodField()
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'status', 'createdAt', 'address', 'payment_method', 'notes', 'items', 'totals')

    def get_createdAt(self, obj):
        return int(obj.created_at.timestamp() * 1000)

    def get_address(self, obj):
        return f'{obj.address}, {obj.city} - {obj.pincode}'

    def get_totals(self, obj):
        return {
            'subtotal': obj.subtotal,
            'delivery': obj.delivery_fee,
            'tax': obj.tax,
            'total': obj.total,
        }