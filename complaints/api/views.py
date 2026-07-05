from rest_framework import generics, permissions
from complaints.models import Complaint
from users.api.permissions import IsOwnerOrReadOnly
from .serializers import ComplaintSerializer
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
