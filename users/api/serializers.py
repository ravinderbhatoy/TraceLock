from rest_framework import serializers
from users.models import User
from complaints.models import Complaint


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "complaints"]
