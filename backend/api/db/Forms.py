from django import forms
from .models import ImageModel


class ImageForm(forms.ModelForm):
    """Form for the image model"""
    class Meta:
        model = ImageModel
        fields = ('title', 'image')