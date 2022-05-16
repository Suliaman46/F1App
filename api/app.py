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

def get_fastest_lap_data(session,driverName, distance=False):
    driver = session.laps.pick_driver(driverName)
    fastestLap = driver.pick_fastest()
    return fastestLap.get_car_data().add_distance() if distance else fastestLap.get_car_data()

def get_fastest_lap_speed_data(session, driverName ):

    carData =get_fastest_lap_data(session,driverName)
    speed =carData['Speed']
    return speed.to_json(orient='values')

def get_fastest_lap_time_data(session, driverName):

    carData =get_fastest_lap_data(session,driverName)
    time = carData['Time']
    timeSec = time.dt.total_seconds()
    return timeSec.to_json(orient='values',double_precision=3)

def get_fastest_lap_rpm_data(session, driverName):
    carData = get_fastest_lap_data(session,  driverName)
    rpm = carData['RPM']
    return rpm.to_json(orient='values')

def get_fastest_lap_brake_data(session, driverName):
    carData = get_fastest_lap_data(session, driverName)
    brake = carData['Brake']
    return brake.to_json(orient='values')

def get_fastest_lap_throttle_data(session, driverName):
    carData = get_fastest_lap_data(session, driverName)
    throttle = carData['Throttle']
    return throttle.to_json(orient='values')

def get_fastest_lap_distance_data(session,driverName):
    carData = get_fastest_lap_data(session,driverName,distance=True)
    distance= carData['Distance']
    return distance.to_json(orient='values')

@app.route('/fastestSTGraph',methods=['GET'])
def get_fastest_st_graph():
    driverName1 = request.args.get('driver1')
    driverName2 = request.args.get('driver2')

    event = request.args.get('event')
    year = request.args.get('year')
    sess = request.args.get('session')

    session = fastf1.get_event(int(year),gp=event).get_session(sess)
    session.load()

    driver1Data = {'time': get_fastest_lap_time_data(session,driverName1),'speed':get_fastest_lap_speed_data(session,driverName1)}
    driver2Data = {'time': get_fastest_lap_time_data(session,driverName2),'speed':get_fastest_lap_speed_data(session,driverName2)}

    return {driverName1: driver1Data, driverName2: driver2Data}


@app.route('/getTelemetry', methods=['GET'])
def get_all_telemetry():
    driverName1 = request.args.get('driver1')
    driverName2 = request.args.get('driver2')

    event = request.args.get('event')
    year = request.args.get('year')
    sess = request.args.get('session')

    session = fastf1.get_event(int(year),gp=event).get_session(sess)
    session.load()

    speed1=get_fastest_lap_speed_data(session,driverName1)
    speed2=get_fastest_lap_speed_data(session,driverName2)

    rpm1 = get_fastest_lap_rpm_data(session,driverName1)
    rpm2 = get_fastest_lap_rpm_data(session,driverName2)

    throttle1 = get_fastest_lap_throttle_data(session,driverName1)
    throttle2 = get_fastest_lap_throttle_data(session,driverName2)

    brake1= get_fastest_lap_brake_data(session,driverName1)
    brake2= get_fastest_lap_brake_data(session,driverName2)

    distance1=get_fastest_lap_distance_data(session, driverName1)
    distance2=get_fastest_lap_distance_data(session, driverName2)

    driver1Data = {'distance': distance1,
                   'speed': speed1,
                   'rpm': rpm1,
                   'throttle': throttle1,
                   'brake':brake1
                   }
    driver2Data = {'distance': distance2,
                   'speed': speed2,
                   'rpm': rpm2,
                   'throttle': throttle2,
                   'brake':brake2
                   }

    return {driverName1: driver1Data, driverName2: driver2Data}






if __name__ == '__main__':
    app.run()
