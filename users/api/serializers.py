from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    city = serializers.ReadOnlyField(source="city.name")
    state = serializers.ReadOnlyField(source="city.state.name")

    class Meta:
        model = User
        fields = [
            "url",
            "username",
            "email",
            "complaints",
            "city",
            "state",
            "address",
        ]
