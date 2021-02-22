import argparse
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlsplit, urlunsplit
import time
import pandas as pd 

def writeFile(data):
    file = open("lastcall.html", "a", encoding='utf-8',)
    file.write(data)
    file.close()

def rm_RBrackets(value):
    return value.replace("[","").replace("]","")

site = 'https://www.imdb.com/title/tt6857376/reviews?sort=helpfulnessScore&dir=desc&ratingFilter=1'
response = requests.get(site)
soup = BeautifulSoup(response.text, 'html.parser')
results = soup.findAll(attrs={'class': 'text show-more__control'})


for i, node in enumerate(results):
    value = rm_RBrackets(str(node.findAll(text=True)))
    #writeFile("Review " + str(i) + " : " + str(value) + "\n")
    writeFile(str(value) + "\n")

