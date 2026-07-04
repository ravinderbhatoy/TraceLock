from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.ComplaintList.as_view(), name="complaint-list"),
    path("<int:pk>/", views.ComplaintDetails.as_view(), name="complaint"),
]

# our API will be able to handle URLs such as http://example.com/api/items/4.json.
urlpatterns = format_suffix_patterns(urlpatterns)
