from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Station
from .forms import CustomUserChangeForm, CustomUserCreationForm


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    fieldsets = UserAdmin.fieldsets + (
        (None, {"fields": ("city", "address")}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {"fields": ("city", "address")}),
    )
    list_display = ["username", "email", "city", "is_staff", "address"]


admin.site.register(User, CustomUserAdmin)
admin.site.register(Station)
