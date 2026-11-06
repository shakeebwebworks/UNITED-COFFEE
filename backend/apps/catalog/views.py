import django_filters
from rest_framework import permissions, viewsets

from .models import Category, Product
from .pagination import StandardPagination
from .serializers import CategorySerializer, ProductSerializer


class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category__name', lookup_expr='iexact')
    featured = django_filters.BooleanFilter(field_name='is_featured')
    best_seller = django_filters.BooleanFilter(field_name='is_best_seller')
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = Product
        fields = []


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True).select_related('category')
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = StandardPagination
    filterset_class = ProductFilter
    search_fields = ['name', 'description', 'tasting_notes', 'category__name']
    ordering_fields = ['price', 'rating', 'reviews_count', 'created_at']


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None