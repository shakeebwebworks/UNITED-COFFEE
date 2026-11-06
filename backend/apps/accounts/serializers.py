from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'phone', 'address', 'is_staff')
        read_only_fields = ('id', 'email', 'is_staff')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ('name', 'email', 'phone', 'password')

    def validate_email(self, value):
        value = value.strip().lower()
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value

    def validate(self, attrs):
        candidate = User(name=attrs.get('name', ''), email=attrs.get('email', ''))
        try:
            validate_password(attrs['password'], candidate)
        except Exception as exc:
            raise serializers.ValidationError({'password': list(getattr(exc, 'messages', [str(exc)]))})
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            phone=validated_data.get('phone', ''),
        )