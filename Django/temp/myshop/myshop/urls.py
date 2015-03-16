from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls import *

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'myshop.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
	(r'^/?$', 'basket.views.show_basket'),
	(r'^site_media/(.*)$', 'django.views.static.serve', {'document_root': 'D:/MY/GRE/CMU Done/Dropbox/Study Material/Spring/Mini 3/IT/Django/temp/myshop/media/'}),
	(r'^addProduct/$', 'basket.views.addProduct'),
	(r'^removeProduct/$', 'basket.views.removeProduct'),
)