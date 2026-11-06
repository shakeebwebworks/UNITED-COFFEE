from rest_framework import generics, permissions
from rest_framework.throttling import AnonRateThrottle

from .serializers import ContactMessageSerializer


class ContactThrottle(AnonRateThrottle):
    scope = 'contact'
    rate = '15/hour'


class ContactCreateView(generics.CreateAPIView):
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ContactThrottle]