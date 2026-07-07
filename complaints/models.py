from django.db import models

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
    date_of_incidence = models.DateTimeField(null=True, blank=True)
    filed_at = models.DateTimeField(auto_now_add=True)
    station = models.ForeignKey('users.Station', on_delete=models.SET_NULL,
                                null=True, related_name='complaints')

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

    def __str__(self):
        return self.model
