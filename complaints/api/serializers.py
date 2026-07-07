from rest_framework import serializers
from complaints.models import Complaint


class ComplaintSerializer(serializers.HyperlinkedModelSerializer):
    city = serializers.ReadOnlyField(source="city.name")
    state = serializers.ReadOnlyField(source="city.state.name")

    class Meta:
        model = Complaint
        fields = [
            "url",  # links view(complaint-detail) automatically
            "filed_by",
            "model",
            "brand",
            "case",
            "city",
            "state",
            "desc",
            "filed_at",
            "station",
        ]

# from documentation
# Our snippet and user serializers include 'url' fields that by default
# will refer to '{model_name}-detail', which in this case will be
# 'complaint-detail' and 'user-detail'.
