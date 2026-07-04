from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.UserList.as_view(), name='user-list'),
    path("users/<int:pk>/", views.UserDetail.as_view(), name='user-details'),
    path("auth/", include('rest_framework.urls'))
]
