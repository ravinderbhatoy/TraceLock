from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.UserList.as_view(), name='user-list'),
    path("<int:pk>/", views.UserDetail.as_view(), name='user-detail'),
    path("stations/", views.StationList.as_view(), name='station-list'),
    path("stations/<int:pk>/",
         views.StationDetail.as_view(), name='station-detail'),
    path("auth/", include('rest_framework.urls')),
    path('auth/register/', views.UserRegistrationView.as_view(), name='user-register'),
]
