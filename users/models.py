from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.username}"
