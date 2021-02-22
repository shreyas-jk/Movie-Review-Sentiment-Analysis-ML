from flask import Flask, redirect, url_for, render_template, request, session
from datetime import timedelta
import pickle
from sklearn.feature_extraction.text import CountVectorizer

import requests
from bs4 import BeautifulSoup
from urllib.parse import urlsplit, urlunsplit
import time

app = Flask(__name__)

def writeFile(data):
    file = open("lastcall.html", "a", encoding='utf-8',)
    file.write(data)
    file.close()

def rm_RBrackets(value):
    return value.replace("[","").replace("]","")

@app.route("/", methods=['GET', 'POST'])
def home():
    final_lst = []
    if request.method == "POST":
        url = request.form['user_url']
        (model, cv) = load_model()
        site = url
        response = requests.get(site)
        soup = BeautifulSoup(response.text, 'html.parser')
        results = soup.findAll(attrs={'class': 'text show-more__control'})
        for node in results:
            value = rm_RBrackets(str(node.findAll(text=True))).replace('"','').replace('\'','')
            sens_value = GetSensResult(model, cv, value)
            final_lst.append((value, sens_value))
    return render_template("index.html", results=final_lst)

def GetSensResult(model, cv, review):
    test_vec = cv.transform([review]).toarray()
    return model.predict(test_vec)[0]

def load_model():
    with open('model.pkl', 'rb') as file:
        (pickle_model, pickle_cv) = pickle.load(file)
        return (pickle_model, pickle_cv)

if __name__ == "__main__":
    app.run(debug=True)