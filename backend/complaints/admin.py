from django.contrib import admin
from .models import (Complaint, State, City, Brand,
                     ComplaintImage)


class ComplaintImageInline(admin.TabularInline):
    model = ComplaintImage


class ComplaintAdmin(admin.ModelAdmin):
    inlines = [
        ComplaintImageInline
    ]


# Register your models here.
admin.site.register(Complaint, ComplaintAdmin)
admin.site.register(State)
admin.site.register(City)
admin.site.register(Brand)
