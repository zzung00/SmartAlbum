from django.apps import AppConfig
from tensorflow.keras.models import load_model

class LoadConfig(AppConfig):
    model = load_model('model/flower_model.h5')

    def ready(self):
        pass