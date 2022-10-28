from ast import While
import sys
import time
import os
import ssl
import json
import serial
import struct
import threading
from digi.xbee.devices import XBeeDevice, RemoteXBeeDevice, XBee64BitAddress

def get_mydata():
    # Instantiate a local XBee node.
    xbee = XBeeDevice("/dev/ttyUSB0", 9600)
    xbee.open()
    
    # Add the callback.
    xbee.add_data_received_callback(my_data_received_callback)
    
    terminate = False
    while not terminate:
        x = input()
        if(x == "terminate"):
            terminate = True
    
    #close the device
    if xbee is not None and xbee.is_open():
        xbee.close()
            
        
def send_my_data():
    # Instantiate a local XBee node.
    # xbee = XBeeDevice(port = "/dev/ttyUSB0",baud_rate=9600)  # Your serial port name here
    # xbee.open()
    
    # # Instantiate a remote XBee node.
    # remote = RemoteXBeeDevice(xbee, XBee64BitAddress.from_hex_string("0013A20041D4BCA8"))
    
    # # Send data using the remote object.
    # xbee.send_data_async(remote, "Hello XBee!")
    time.sleep(2.4)
    
# Define the callback.
def my_data_received_callback(xbee_message):
    address = xbee_message.remote_device.get_64bit_addr()
    data = xbee_message.data.decode("utf8")
    print("Received data from %s: %s" % (address, data))

if __name__ =="__main__":
    # creating thread
    t1 = threading.Thread(target=get_mydata, name='t1')
    t2 = threading.Thread(target=send_my_data, name='t2')
 
    # starting thread 1
    t1.start()
    # starting thread 2
    t2.start()
    
    #wait for thread to complete
    t1.join()
    t2.join()

#sample code  
# PORT = '/dev/ttyUSB0'
# BAUD_RATE = 9600

# ser  = serial.Serial(PORT, BAUD_RATE, timeout = 1)
# zb = ZigBee(ser)

# def on_connect(client, userdata, flags, rc):
#     print("Connected with result code " + str(rc))

# client = mqtt.Client()
# client.on_connect = on_connect
# client.tls_set(ca_certs ='', certfile='', keyfile='')
# client.tls_insecure_set(True)
# client.connect("", 8883,60)

# def intrusionDetector(Dummy):
#     while True:
#         try:
#             frame = zb.wait_read_frame()
#             dest = repr(frame['source_addr_long'])
#             data1 = repr(frame['rf_data'])
#             data = 'tmp:%s'%struct.unpack('>b', frame['rf_data'])[0]
#             print(data)
#             client.publish("home/temp", payload = data, qos=0, retain= False)
#         except KeyError: 
#             print("Error Occured")

# thread.start_new_thread(intrusionDetector, ("Create intrusion Thread",))
# client.loop_forever()