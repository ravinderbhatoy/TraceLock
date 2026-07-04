from rest_framework import serializers
from complaints.models import Complaint


class ComplaintSerializer(serializers.ModelSerializer):

    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Complaint
        fields = '__all__'
