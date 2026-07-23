"""
URL configuration for tracelock project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.contrib import admin
from django.urls import path, include
from users.api.views import (CustomTokenObtainPairView,
                             CustomRefreshTokenView, CSRFAPIView)

urlpatterns = [
    path('', include("complaints.urls")),
    path("api/csrf/", CSRFAPIView.as_view(), name='csrf-token'),
    path('admin/', admin.site.urls),
    path('users/', include("users.urls")),
    path('api/users/', include('users.api.urls')),
    path('api/complaints/', include('complaints.api.urls')),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
]
