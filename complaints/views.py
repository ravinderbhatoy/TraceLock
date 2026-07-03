from django.http import HttpResponseRedirect
from django.shortcuts import render
from .models import Complaint
from django.views import View
from .forms import ComplaintForm

# Create your views here.


class Home(View):
    template_name = "complaints/index.html"

    def get(self, request):
        return render(request, self.template_name)


class Complaints(View):
    complaints = Complaint.objects.all()
    template_name = "complaints/list.html"
    context = {
        "complaints": complaints
    }

    def get(self, request):
        return render(request, self.template_name, self.context)


class ComplaintDetails(View):
    template_name = "complaints/details.html"

    def get(self, request, *args, **kwargs):
        complaint = Complaint.objects.get(id=kwargs.get('id'))
        context = {
            "complaint": complaint
        }
        return render(request, self.template_name, context)


class CreateComplaint(View):
    # TODO
    # Backend validation for date_of_incidence(avoid future dates)
    template_name = "complaints/create.html"
    initial = {"owner":  1}
    form_class = ComplaintForm

    def get(self, request, *args, **kwargs):
        form = self.form_class(initial=self.initial)
        return render(request, self.template_name, {"form": form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/')
        return render(request, self.template_name, {"form": form})
