from django.contrib import admin
from .models import (Complaint, State, City, Brand,
                     ComplaintFile)


class ComplaintFileInline(admin.TabularInline):
    model = ComplaintFile


class ComplaintAdmin(admin.ModelAdmin):
    inlines = [
        ComplaintFileInline
    ]


# Register your models here.
admin.site.register(Complaint, ComplaintAdmin)
admin.site.register(State)
admin.site.register(City)
admin.site.register(Brand)
