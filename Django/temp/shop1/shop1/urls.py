from django.conf.urls import patterns, include, url
from django.contrib import admin
from os.path import join
from django.conf.urls.defaults import *

urlpatterns = patterns('',
(r'^/?$', 'shop.basket.views.show_basket'),
(r'^site_media/(.*)$', 'django.views.static.serve', {'document_root': os.path.join(os.path.dirname(__file__),'media')}),
)
