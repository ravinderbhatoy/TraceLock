from rest_framework import serializers
from complaints.models import Complaint, City, Brand, ComplaintImage


FIELDS = [
    "id",
    "url",  # links view(complaint-detail) automatically
    "filed_by",
    "model",
    "brand",
    "brand_name",
    "brand_id",
    "case",
    "city",
    "city_id",
    "city_name",
    "state",
    "date_of_incidence",
    "desc",
    "filed_at",
    "station",
    "status",
]


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class CitySerializer(serializers.HyperlinkedModelSerializer):
    state = serializers.ReadOnlyField(source="state.name")

    class Meta:
        model = City
        fields = ['id', 'name', 'state']


class ComplaintImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplaintImage
        fields = '__all__'


class ComplaintStatusUpdateSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(view_name="complaint-detail")
    state = serializers.ReadOnlyField(source="city.state.name")
    station = serializers.ReadOnlyField(source="station.name")
    # Read-only representation for GET requests
    brand_name = serializers.ReadOnlyField(source="brand.name")
    city_name = serializers.ReadOnlyField(source='city.name')

    class Meta:
        model = Complaint
        fields = FIELDS
        read_only_fields = [field for field in FIELDS if field != 'status']


class ComplaintSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="complaint-detail")
    state = serializers.ReadOnlyField(source="city.state.name")
    station = serializers.ReadOnlyField(source="station.name")

    # Writable field for POST/PUT (accepts integer ID)
    brand = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(), write_only=True)
    brand_id = serializers.IntegerField(source='brand.id', read_only=True)
    # Read-only representation for GET requests
    brand_name = serializers.ReadOnlyField(source="brand.name")

    city = serializers.PrimaryKeyRelatedField(write_only=True, queryset=City.objects.all())
    city_id = serializers.IntegerField(source='city.id', read_only=True)
    city_name = serializers.ReadOnlyField(source='city.name')
    status = serializers.ReadOnlyField(source='get_status_display')

    class Meta:
        model = Complaint
        fields = FIELDS
        read_only_fields = ['station', 'status', 'filed_by']

# from documentation
# Our snippet and user serializers include 'url' fields that by default
# will refer to '{model_name}-detail', which in this case will be
# 'complaint-detail' and 'user-detail'.
