from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.Home.as_view(), name="home"),
    path("complaints/", views.Complaints.as_view(), name="complaints-list"),
    path("complaint/details/<int:pk>/",
         views.ComplaintDetails.as_view(), name="details"),
    path("complaints/create/", views.CreateComplaint.as_view(), name="create"),
    path("complaints/delete/<int:pk>/", views.DeleteComplaint.as_view(),
         name="delete"),
    path("complaints/update/<int:pk>/", views.UpdateComplaint.as_view(),
         name="update")
]
