import subprocess
import os

from django.http import HttpResponse
from django.shortcuts import render

def plugin_page(request):
    return render(request, "../templates/pluginIndex.html")




