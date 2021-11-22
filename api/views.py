from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import tensorflow

# Create your views here.

@api_view(['POST'])
def find(request):
    file = request.POST.get('file')
    return Response(status=status.HTTP_200_OK)