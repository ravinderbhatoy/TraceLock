from rest_framework import generics, permissions
from rest_framework import serializers
from complaints.models import Complaint, City
from users.api.permissions import IsOwnerOrReadOnly
from .serializers import ComplaintSerializer, CitySerializer
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def api_root(request, format=None):
    return Response(
        {
            "users": reverse('user-list', request=request, format=format),
            "complaints": reverse('complaint-list', request=request,
                                  format=format)
        }
    )


class CityList(generics.ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [permissions.AllowAny]


class CityDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [permissions.AllowAny]


class ComplaintList(generics.ListCreateAPIView):
    queryset = Complaint.objects.all().order_by('-filed_at')
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated,
                          IsOwnerOrReadOnly]

    # auto associate owner
    def perform_create(self, serializer):
        user = self.request.user
        city = serializer.validated_data.get('city')
        if not city:
            raise serializers.ValidationError("City is required")
        if not hasattr(city, 'station'):
            raise serializers.ValidationError(
                "No station found for selected city")
        serializer.save(filed_by=user,
                        station=city.station)


class ComplaintDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]
