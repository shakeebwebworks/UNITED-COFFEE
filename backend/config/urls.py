from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
import os

from django.urls import include, path, re_path
from django.views.static import serve

admin.site.site_header = 'United Coffee Admin'
admin.site.site_title = 'United Coffee'
admin.site.index_title = 'Cafe Management'


def health(request):
    return JsonResponse({'status': 'ok', 'service': 'united-coffee-api'})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health),
    path('api/auth/', include('apps.accounts.urls')),
    path('api/cart/', include('apps.cart.urls')),
    path('api/orders/', include('apps.orders.urls')),
    path('api/contact/', include('apps.contact.urls')),
    path('api/newsletter/', include('apps.newsletter.urls')),
    path('api/', include('apps.catalog.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
elif os.getenv('SERVE_MEDIA', 'False').lower() == 'true':
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    ]