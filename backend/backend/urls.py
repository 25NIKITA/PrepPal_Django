from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# ✅ Add a simple root endpoint
def home(request):
    return JsonResponse({"message": "Welcome to the API!"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),  # Includes all routes from base/urls.py
    path('', home, name="home"),  # ✅ Root path
]
