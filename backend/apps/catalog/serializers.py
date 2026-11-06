from rest_framework import serializers

from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    image = serializers.SerializerMethodField()
    reviews = serializers.IntegerField(source='reviews_count', read_only=True)
    notes = serializers.SerializerMethodField()
    featured = serializers.BooleanField(source='is_featured', read_only=True)
    bestSeller = serializers.BooleanField(source='is_best_seller', read_only=True)

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'category', 'description', 'price', 'image',
            'rating', 'reviews', 'notes', 'featured', 'bestSeller',
        )

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url

    def get_notes(self, obj):
        return [n.strip() for n in obj.tasting_notes.split(',') if n.strip()]