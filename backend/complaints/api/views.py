from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework import generics, permissions
from rest_framework import serializers
from complaints.models import Complaint, City, Brand, ComplaintFile
from users.api.permissions import IsStationOrOwnerOrReadOnly, IsOwnerOrReadOnly
from .serializers import (ComplaintSerializer, CitySerializer,
                          ComplaintStatusUpdateSerializer,
                          ComplaintFileSerializer,
                          BrandSerializer)
from django.db import transaction


@api_view(['GET'])
def api_root(request, format=None):
    return Response(
        {
            "users": reverse('user-list', request=request, format=format),
            "complaints": reverse('complaint-list', request=request,
                                  format=format)
        }
    )


class BrandList(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [permissions.AllowAny]


class CityList(generics.ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [permissions.AllowAny]


class CityDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class ComplaintFileList(generics.ListAPIView):
    serializer_class = ComplaintFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        complaint_id = self.kwargs.get('pk')
        return ComplaintFile.objects.filter(complaint=complaint_id)


class ComplaintList(generics.ListCreateAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Complaint.objects.all().order_by('-filed_at')
        city = self.request.query_params.get('city')
        if city is not None:
            queryset = queryset.filter(city__name=city)
        return queryset

    # auto associate owner
    @transaction.atomic
    def perform_create(self, serializer):
        user = self.request.user
        city = serializer.validated_data.get('city')
        files = self.request.FILES.getlist('files')
        print(files)

        ALLOWED_TYPES = {
            "image/png",
            "image/jpeg",
            "application/pdf",
        }

        if len(files) > 5:
            raise serializers.ValidationError(
                "You can upload a maximum of 5 files."
            )

        for file in files:
            if file.content_type not in ALLOWED_TYPES:
                raise serializers.ValidationError(
                    f"{file.name} is not an allowed file type."
                )

        # Atomicity
        with transaction.atomic():
            complaint = serializer.save(
                filed_by=user,
                station=city.station
            )

            for file in files:
                ComplaintFile.objects.create(
                    complaint=complaint,
                    file=file
                )


class ComplaintDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Complaint.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrReadOnly,
    ]

    def get_serializer_class(self):
        if self.request.user.is_station():
            return ComplaintStatusUpdateSerializer
        return ComplaintSerializer


class UserComplaintList(generics.ListAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Complaint.objects.filter(filed_by=user).order_by('-filed_at')

        return queryset
