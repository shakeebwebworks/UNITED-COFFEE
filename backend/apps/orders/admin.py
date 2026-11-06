from django.contrib import admin

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    can_delete = False
    readonly_fields = ('product', 'name', 'price', 'quantity')

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'name', 'phone', 'total', 'payment_method', 'status', 'created_at')
    list_editable = ('status',)
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('order_number', 'name', 'phone', 'user__email')
    readonly_fields = ('order_number', 'user', 'subtotal', 'delivery_fee', 'tax', 'total', 'created_at', 'updated_at')
    inlines = [OrderItemInline]
    actions = ['mark_confirmed', 'mark_delivered', 'mark_cancelled']

    @admin.action(description='Mark selected as Confirmed')
    def mark_confirmed(self, request, queryset):
        queryset.update(status='Confirmed')

    @admin.action(description='Mark selected as Delivered')
    def mark_delivered(self, request, queryset):
        queryset.update(status='Delivered')

    @admin.action(description='Mark selected as Cancelled')
    def mark_cancelled(self, request, queryset):
        queryset.update(status='Cancelled')