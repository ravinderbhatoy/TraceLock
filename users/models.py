from django.db import models
from django.contrib.auth.models import AbstractUser
from complaints.models import City
# Create your models here.


class User(AbstractUser):
    city = models.ForeignKey(
        City, on_delete=models.PROTECT,
        null=True, related_name="city",
    )

    address = models.TextField()

    def is_station(self):
        return hasattr(self, 'station')

    def __str__(self):
        return f"{self.username}"


class Station(models.Model):
    name = models.CharField(max_length=100)
    user = models.OneToOneField(
        User, on_delete=models.PROTECT, related_name='station')
    city = models.OneToOneField(
        City, on_delete=models.PROTECT, related_name='station')
    address = models.TextField()

    def __str__(self):
        return f"{self.name} ({self.city})"
