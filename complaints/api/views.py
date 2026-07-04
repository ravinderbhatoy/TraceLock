from rest_framework import mixins, generics, permissions
from complaints.models import Complaint
from accounts.api.permissions import IsOwnerOrReadOnly
from .serializers import ComplaintSerializer


class ComplaintList(generics.ListCreateAPIView):
    queryset = Complaint.objects.all().order_by('-register_at')
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]

    # auto associate owner
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ComplaintDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]
