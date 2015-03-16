from django.shortcuts import render
from django.shortcuts import render_to_response

def show_basket(request):
	return render_to_response('fly-to-basket.html')