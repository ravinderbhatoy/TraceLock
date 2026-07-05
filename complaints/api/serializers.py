from rest_framework import serializers
from complaints.models import Complaint


class ComplaintSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Complaint
        fields = [
            "url",  # links view(complaint-detail) automatically
            "owner",
            "model",
            "brand",
            "case",
            "location",
            "desc",
            "date_of_incidence",
            "register_at"
        ]

# from documentation
# Our snippet and user serializers include 'url' fields that by default
# will refer to '{model_name}-detail', which in this case will be
# 'complaint-detail' and 'user-detail'.
