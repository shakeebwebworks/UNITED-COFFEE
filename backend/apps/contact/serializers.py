from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ('name', 'email', 'subject', 'message')
        extra_kwargs = {
            'name': {'min_length': 2},
            'message': {'min_length': 10, 'max_length': 2000},
        }