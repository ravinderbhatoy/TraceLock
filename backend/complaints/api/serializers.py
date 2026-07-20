from rest_framework import serializers
from complaints.models import Complaint, City


class CitySerializer(serializers.HyperlinkedModelSerializer):
    state = serializers.ReadOnlyField(source="state.name")

    class Meta:
        model = City
        fields = [
            "url",  # links view(complaint-detail) automatically
            "id",
            "name",
            "state"
        ]


class ComplaintSerializer(serializers.HyperlinkedModelSerializer):
    state = serializers.ReadOnlyField(source="city.state.name")
    station = serializers.ReadOnlyField(source="station.name")

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
            "date_of_incidence",
            "desc",
            "filed_at",
            "station",
            "status",
        ]

# from documentation
# Our snippet and user serializers include 'url' fields that by default
# will refer to '{model_name}-detail', which in this case will be
# 'complaint-detail' and 'user-detail'.
