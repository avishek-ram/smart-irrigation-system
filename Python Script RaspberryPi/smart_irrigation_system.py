from ast import While
import sys
import time
import paho.mqtt.client as mqtt
import ssl
import json
import serial
import struct
import thread
from xbee import Zigbee
frpm xbee.hlpers.dispatch import Dispatch

PORT = '/dev/ttyUSB0'
BAUD_RATE = 9600

ser  = serial.Serial(PORT, BAUD_RATE, timeout = 1)
zb = ZigBee(ser)

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

client = mqtt.Client()
client.on_connect = on_connect
client.tls_set(ca_certs ='', certfile='', keyfile='')
client.tls_insecure_set(True)
client.connect("", 8883,60)

def intrusionDetector(Dummy):
    while True:
        try:
            frame = zb.wait_read_frame()
            dest = repr(frame['source_addr_long'])
            data1 = repr(frame['rf_data'])
            data = 'tmp:%s'%struct.unpack('>b', frame['rf_data'])[0]
            print(data)
            client.publish("home/temp", payload = data, qos=0, retain= False)
        except KeyError: 
            print("Error Occured")

thread.start_new_thread(intrusionDetector, ("Create intrusion Thread",))
client.loop_forever()