from django.urls import path
from . import views

urlpatterns = [
    path("", views.Home.as_view(), name="index"),
    path("complaints/", views.Complaints.as_view(), name="complaints"),
    path("complaint/details/<int:id>/",
         views.ComplaintDetails.as_view(), name="details"),

    # crud
    path("complaints/create/", views.CreateComplaint.as_view(), name="create"),
]
