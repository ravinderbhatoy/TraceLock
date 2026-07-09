from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError

BRAND_CHOICES = [
    ("Apple", "Apple"),
    ("Samsung", "Samsung"),
    ("OnePlus", "OnePlus"),
    ("Xiaomi", "Xiaomi"),
    ("Google", "Google"),
    ("Motorola", "Motorola"),
    ("Vivo", "Vivo"),
    ("Oppo", "Oppo"),
    ("Realme", "Realme"),
    ("Other", "Other")
]


class State(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class City(models.Model):

    state = models.ForeignKey(
        State, on_delete=models.CASCADE,
        related_name='cities'
    )
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Cities"

    def __str__(self):
        return self.name


def validate_not_future_day(value):
    if value:
        # Get today's date in the current active timezone
        today = timezone.localdate()
        # Extract the date from the input datetime
        input_date = timezone.localdate(value)

        if input_date > today:
            raise ValidationError(
                "The date of incidence cannot be in the future.")


class Complaint(models.Model):
    CASE_CHOICES = [
        ('S', 'Stolen'),
        ('L', 'Lost')
    ]
    filed_by = models.ForeignKey(
        'users.User', on_delete=models.CASCADE,
        related_name='complaints'
    )

    city = models.ForeignKey(
        City, on_delete=models.PROTECT,
        related_name='complaints'
    )

    model = models.CharField(max_length=100)
    brand = models.CharField(max_length=50, choices=BRAND_CHOICES)
    desc = models.TextField()
    case = models.CharField(max_length=1, choices=CASE_CHOICES)
    date_of_incidence = models.DateTimeField(null=True,
                                             blank=True,
                                             validators=[validate_not_future_day])
    filed_at = models.DateTimeField(auto_now_add=True)
    station = models.ForeignKey('users.Station', on_delete=models.SET_NULL,
                                null=True, related_name='complaints', blank=True)

    STATUS_CHOICES = [
        ('filed', 'Filed'),
        ('pending_verification', 'Pending Verification'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
        ('under_investigation', 'Under Investigation'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]
    status = models.CharField(
        max_length=30, choices=STATUS_CHOICES, default='filed')
    rejection_reason = models.CharField(max_length=100, blank=True)
    verified_at = models.DateTimeField(null=True, blank=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.city:
            try:
                self.station = self.city.station
            except Exception:
                pass
        super().save(*args, **kwargs)

    def __str__(self):
        return self.model
