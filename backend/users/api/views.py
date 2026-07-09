from .serializers import UserSerializer, StationSerializer
from users.models import User, Station
from rest_framework import generics


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class StationList(generics.ListAPIView):
    queryset = Station.objects.all()
    serializer_class = StationSerializer


class StationDetail(generics.RetrieveAPIView):
    queryset = Station.objects.all()
    serializer_class = StationSerializer
