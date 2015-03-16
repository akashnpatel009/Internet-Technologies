from django.shortcuts import render_to_response
from django.http import HttpResponse
from basket.models import *
from django.template import RequestContext
#from django.views.decorators.csrf import csrf_exempt

# taken from the template/example
products = {
'1': ['Calendar', '50'],
'2': ['Shopping module', '250'],
'3': ['Menu package', '35'],
'4': ['Ajax package', '50'],
'5': ['Week planner', '60'],
'6': ['Forum package', '150'],
'7': ['HTML editor', '150'],
'8': ['CSS creator', '125']
}

def show_basket(request):
	return render_to_response('fly-to-basket.html')
	

def addProduct(request):
	product = Basket(product_id = int(request.GET['productId']))
	product.save()
	res = products[request.GET['productId']]
	return render_to_response('add.html', {'result': res, 'id': request.GET['productId']})
	#return render_to_response('add.html', {'result': res, 'id': request.GET['productId']}, context_instance = RequestContext(request))
	
def removeProduct(request):
	# whe have only product id so we need to delete one entry that has it.
	Basket.objects.filter(product_id__exact=int(request.GET['productIdToRemove']))[0].delete()
	# JavaScript wants this
	return HttpResponse("OK")
