from django.urls import path
from api import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('find/', views.find)
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)