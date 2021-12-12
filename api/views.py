from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from tensorflow import keras
import tensorflow as tf
import numpy as np

from SmartAlbum.settings import BASE_DIR
from . import load
from django.core.files.storage import FileSystemStorage
from PIL import Image
import os
from django.conf import settings

class_names = ['데이지', '민들레', '장미', '해바라기', '튤립']


# Create your views here.

@api_view(['POST'])
def find(request):
    img_height = 180
    img_width = 180
    
    file = request.FILES['file']
    fs = FileSystemStorage()
    filename = fs.save(file.name, file)
    file_url = fs.base_location
    file_url = os.path.join(file_url, file.name)
    img = keras.preprocessing.image.load_img(file_url, target_size=(img_height, img_width))
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    predictions = load.LoadConfig.model.predict(img_array)
    score = tf.nn.softmax(predictions[0])
    return Response(class_names[np.argmax(score)], status=status.HTTP_200_OK)