from django.contrib import admin
from django.utils.html import format_html

from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'slug')
    list_editable = ('position',)
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('thumb', 'name', 'category', 'price', 'is_active', 'is_featured', 'is_best_seller')
    list_display_links = ('thumb', 'name')
    list_editable = ('price', 'is_active', 'is_featured', 'is_best_seller')
    list_filter = ('category', 'is_active', 'is_featured', 'is_best_seller')
    search_fields = ('name', 'description', 'tasting_notes')
    list_per_page = 25

    @admin.display(description='Image')
    def thumb(self, obj):
        src = obj.image.url if obj.image else obj.image_url
        if not src:
            return '-'
        return format_html(
            '<img src="{}" width="44" height="44" style="object-fit:cover;border-radius:8px" />', src
        )