from flask import Flask
from flask_cors import CORS
import fastf1
import fastf1.plotting

app = Flask(__name__)
CORS(app)
fastf1.Cache.enable_cache('./cache')


@app.route('/',methods=['GET'])
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
