from .models import User, Complaint
from django import forms


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = "__all__"


class ComplaintForm(forms.ModelForm):
    class Meta:
        model = Complaint
        fields = "__all__"

        widgets = {
            "date_of_incidence": forms.DateInput(format="%Y-%m-%d",
                                                 attrs={"type": "date"}),
        }
