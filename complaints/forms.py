from .models import Complaint
from django import forms
from django.utils import timezone
from users.models import User


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = "__all__"


class ComplaintForm(forms.ModelForm):
    class Meta:
        model = Complaint
        fields = "__all__"

        widgets = {
            "date_of_incidence": forms.DateInput(
                format="%Y-%m-%d",
                attrs={
                    "type": "date",
                    "max": timezone.now().date().isoformat()
                }
            ),
        }
