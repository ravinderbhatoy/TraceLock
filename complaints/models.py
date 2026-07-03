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


class Complaint(models.Model):
    CASE_CHOICES = [
        ('S', 'Stolen'),
        ('L', 'Lost')
    ]
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE,
        default=User.get_default_user
    )

    model = models.CharField(max_length=100)
    brand = models.CharField(max_length=50)
    desc = models.TextField()

    case = models.CharField(max_length=1, choices=CASE_CHOICES)
    location = models.TextField()

    date_of_incidence = models.DateTimeField()
    register_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.model
