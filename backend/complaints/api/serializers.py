from rest_framework import serializers
from complaints.models import Complaint, City, Brand


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


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


class ComplaintSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="complaint-detail")
    state = serializers.ReadOnlyField(source="city.state.name")
    station = serializers.ReadOnlyField(source="station.name")

    # Writable field for POST/PUT (accepts integer ID)
    brand = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(), write_only=True)
    # Read-only representation for GET requests
    brand_name = serializers.ReadOnlyField(source="brand.name")

    city = serializers.PrimaryKeyRelatedField(write_only=True, queryset=City.objects.all())
    city_name = serializers.ReadOnlyField(source='city.name')

    class Meta:
        model = Complaint
        fields = [
            "url",  # links view(complaint-detail) automatically
            "filed_by",
            "model",
            "brand",
            "brand_name",
            "case",
            "city",
            "city_name",
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
