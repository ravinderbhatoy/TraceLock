from .models import User
from django.contrib.auth.forms import (AdminUserCreationForm, UserChangeForm,
                                       UserCreationForm)


class SignUpForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = (
            "username",
            "email",
            "password1",
            "password2",
            "first_name",
            "last_name",
        )


class CustomUserCreationForm(AdminUserCreationForm):
    class Meta(AdminUserCreationForm.Meta):
        model = User
        fields = AdminUserCreationForm.Meta.fields + ("city", "state")


class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = UserChangeForm.Meta.fields
