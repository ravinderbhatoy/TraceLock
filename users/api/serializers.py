from rest_framework import serializers
from users.models import User, Station


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
