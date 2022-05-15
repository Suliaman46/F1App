from flask import Flask
from flask import request
from flask_cors import CORS
import fastf1
import fastf1.plotting
from datetime import datetime
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)
fastf1.Cache.enable_cache('./cache')

globalSession = None

@app.route('/',methods=['GET'])
def hello_world():
    return 'Hello World!'
@app.route('/events', methods=['GET'])
def get_races():
    year = request.args.get('year')
    dt_now = np.datetime64(datetime.now())

    events = fastf1.get_event_schedule(int(year), include_testing=False)
    return({'events':events.loc[events["EventDate"] < dt_now]["Country"].to_numpy().tolist()})
@app.route('/drivers',methods=['GET'])
def get_drivers():
    event =request.args.get('event')
    year = request.args.get('year')
    sess = request.args.get('session')
    session = fastf1.get_event(int(year),gp=event).get_session(sess)

    session.load()
    driverList = pd.unique(session.laps['Driver']).tolist()
    return {'drivers': driverList}
@app.route('/fastestSTGraph',methods=['GET'])
def get_fastest_st_graph():
    driverName = request.args.get('driver')
    event = request.args.get('event')
    year = request.args.get('year')
    sess = request.args.get('session')

    session = fastf1.get_event(int(year),gp=event).get_session(sess)
    session.load()

    driver = session.laps.pick_driver(driverName)
    fastestLap = driver.pick_fastest()
    carData = fastestLap.get_car_data()
    speed =carData['Speed']
    time = carData['Time']
    timeSec = time.dt.total_seconds()

    return {'time':timeSec.to_json(orient='values', double_precision=3), 'speed': speed.to_json(orient='values')}
if __name__ == '__main__':
    app.run()
