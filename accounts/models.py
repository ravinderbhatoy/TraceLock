from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)

    @classmethod
    def get_default_user(self):
        user = self.objects.get(pk=1)
        return user.pk

    def __str__(self):
        return f"{self.username}"
