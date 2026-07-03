from django.db import models
from accounts.models import User


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
    location = models.CharField()

    date_of_incidence = models.DateTimeField()
    register_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.model
