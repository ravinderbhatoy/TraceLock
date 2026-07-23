from rest_framework import serializers
from users.models import User, Station
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import PasswordField


class UserSerializer(serializers.HyperlinkedModelSerializer):
    city = serializers.ReadOnlyField(source="city.name")
    state = serializers.ReadOnlyField(source="city.state.name")

    class Meta:
        model = User
        fields = [
            "url",
            "first_name",
            "last_name",
            "username",
            "email",
            "complaints",
            "city",
            "state",
            "address",
        ]


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = PasswordField()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True,
                                      validators=[validate_password])
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'first_name',
                  'last_name', 'city',  'address']

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password2": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password1')
        user = User(**validated_data)
        user.set_password(password)  # critical — never save raw password
        user.save()
        return user


class StationSerializer(serializers.HyperlinkedModelSerializer):
    city = serializers.ReadOnlyField(source="city.name")
    state = serializers.ReadOnlyField(source="city.state.name")
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Station
        fields = [
            "url",
            "name",
            "user",
            "city",
            "address",
            "state",
            "address",
        ]
