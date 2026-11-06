from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=90, unique=True, blank=True)
    position = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['position', 'name']
        verbose_name_plural = 'categories'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='products')
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    price = models.PositiveIntegerField(validators=[MinValueValidator(1)], help_text='Price in rupees')
    image = models.ImageField(upload_to='products/', blank=True)
    image_url = models.URLField(max_length=500, blank=True, help_text='Optional. Used when no image is uploaded.')
    rating = models.FloatField(default=4.5, validators=[MinValueValidator(0), MaxValueValidator(5)])
    reviews_count = models.PositiveIntegerField(default=0)
    tasting_notes = models.CharField(max_length=200, blank=True, help_text='Comma separated, e.g. Cocoa, Caramel')
    is_featured = models.BooleanField(default=False)
    is_best_seller = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name