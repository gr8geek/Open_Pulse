from flask import Flask
app = Flask(__name__)
@app.route("/")
def hello():
    return "Hello World"

@app.route("/pratyush")
def pbhai():
    return "Hello Pratyush Harsh"

app.run(debug=True)
