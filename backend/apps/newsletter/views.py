from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import NewsletterSubscriber
from .serializers import SubscribeSerializer


class NewsletterThrottle(AnonRateThrottle):
    scope = 'newsletter'
    rate = '15/hour'


class SubscribeView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [NewsletterThrottle]

    def post(self, request):
        serializer = SubscribeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email'].strip().lower()
        sub, created = NewsletterSubscriber.objects.get_or_create(email=email)
        if not created and not sub.is_active:
            sub.is_active = True
            sub.save(update_fields=['is_active'])
        return Response({'detail': 'Subscribed.'}, status=201 if created else 200)