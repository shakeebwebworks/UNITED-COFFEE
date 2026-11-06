from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import path

admin.site.site_header = 'United Coffee Admin'
admin.site.site_title = 'United Coffee'
admin.site.index_title = 'Cafe Management'


def health(request):
    return JsonResponse({'status': 'ok', 'service': 'united-coffee-api'})


urlpatterns = [
    path('', health),
    path('admin/', admin.site.urls),
    path('api/health/', health),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)