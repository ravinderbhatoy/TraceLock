from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render, redirect, reverse
from .models import Complaint
from django.views.generic import ListView, UpdateView
from django.views import View
from .forms import ComplaintForm

# Create your views here.


class Home(View):
    template_name = "complaints/index.html"

    def get(self, request):
        return render(request, self.template_name)


class Complaints(ListView):
    model = Complaint
    template_name = "complaints/list.html"


class ComplaintDetails(View):
    template_name = "complaints/details.html"

    def get(self, request, *args, **kwargs):
        complaint = Complaint.objects.get(pk=kwargs.get('pk'))
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
            return redirect('home')
        return render(request, self.template_name, {"form": form})


class UpdateComplaint(UpdateView):
    model = Complaint
    template_name = "complaints/update.html"
    form_class = ComplaintForm

    def get_success_url(self):
        return reverse("details", kwargs={"pk": self.object.pk})


class DeleteComplaint(View):
    def get(self, request, *args, **kwargs):
        complaint = get_object_or_404(Complaint, pk=kwargs.get('pk'))
        return render(
            request,
            'complaints/confirm_delete.html',
            {'complaint': complaint}
        )

    def post(self, request, *args, **kwargs):
        complaint = get_object_or_404(Complaint, pk=kwargs.get('pk'))
        complaint.delete()
        return redirect('complaints-list')
