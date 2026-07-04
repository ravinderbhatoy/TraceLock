from rest_framework import serializers
from accounts.models import User
from complaints.models import Complaint


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "complaints"]
