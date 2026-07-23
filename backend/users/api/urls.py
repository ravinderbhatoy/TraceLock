from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.UserList.as_view(), name='user-list'),
    path('me/', views.UserMeView.as_view(), name='user-me'),
    path("<int:pk>/", views.UserDetail.as_view(), name='user-detail'),
    path("stations/", views.StationList.as_view(), name='station-list'),
    path("stations/<int:pk>/",
         views.StationDetail.as_view(), name='station-detail'),
    path("auth/", include('rest_framework.urls')),
    path('auth/register/', views.UserRegistrationView.as_view(), name='register'),
    path('auth/login/', views.UserLoginView.as_view(), name='login'),
    path("logout/", views.LogoutView.as_view(), name="logout")
]
