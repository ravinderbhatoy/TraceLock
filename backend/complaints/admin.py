from django.contrib import admin
from .models import Complaint, State, City

# Register your models here.
admin.site.register(Complaint)
admin.site.register(State)
admin.site.register(City)
