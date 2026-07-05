from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from .forms import CustomUserChangeForm, CustomUserCreationForm


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    fieldsets = UserAdmin.fieldsets + (
        (None, {"fields": ("city", "state")}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {"fields": ("city", "state")}),
    )
    list_display = ["username", "email", "city", "state", "is_staff"]


admin.site.register(User, CustomUserAdmin)
