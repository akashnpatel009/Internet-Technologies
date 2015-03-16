from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def testView(request):
   #return HttpResponse("Hello World")
   return render(request,'testApp/index1.html')