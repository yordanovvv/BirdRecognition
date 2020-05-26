from flask import Flask, request, render_template, jsonify, session, redirect
from fastai.vision import *

app = Flask(__name__)
learn = load_learner('models')


@app.route('/', methods=['POST', 'GET'])
def hello_world():
    return render_template("index.html")


@app.route('/analyze', methods=['POST', 'GET'])
def analyze():
    return render_template("analyze.html")


@app.route('/login', methods=['POST', 'GET'])
def login():
    return render_template("login.html")


@app.route('/about', methods=['POST', 'GET'])
def about():
    return render_template('about.html')


@app.route('/gallery', methods=['POST', 'GET'])
def gallery():
    return render_template("gallery.html")


@app.route('/signup', methods=['POST', 'GET'])
def signup():
    # # TODO: fix session
    # if request.method == 'POST':
    #     username = request.form['username']
    #     session['username'] = username
    # if session.get('username') is not None:
    #     return redirect('/')
    # else:
    return render_template("signup.html")


@app.route('/analyzeImage', methods=['POST', 'GET'])
def analyze_image():

    img = request.files['file']
    img = open_image(img)
    prediction, category_number, probabilities = learn.predict(img)
    probability = str(probabilities[category_number])
    probability = probability[probability.find("(")+1:probability.find(")")]
    probability = int(100) * float(probability)
    prediction = str(prediction)[4:]
    prediction = prediction.replace('_', ' ')
    return jsonify(prediction=prediction, probability=probability)


if __name__ == '__main__':
    app.run()
