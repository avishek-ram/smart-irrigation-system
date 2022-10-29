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

# Define the callback.
def my_data_received_callback(xbee_message):
    address = xbee_message.remote_device.get_64bit_addr()
    data = xbee_message.data.decode("utf8")
    print("Received data from %s: %s" % (address, data))

# Instantiate a local XBee node.
xbee = XBeeDevice(port = "/dev/ttyUSB0", baud_rate=9600)
xbee.open()

#Instantiate a remote Xbee node
remote = RemoteXBeeDevice(xbee, XBee64BitAddress.from_hex_string("0013A20041D4BCA8"))

# Add the callback.
xbee.add_data_received_callback(my_data_received_callback)
    
def get_mydata():
    terminate = False
    while not terminate:
        x = input() # will prevent termination so we can recieve data
        if(x == "terminate"):
            terminate = True
    
    #close the device
    if xbee is not None and xbee.is_open():
        xbee.close()
            
        
def send_my_data():
    # Send data using the remote object.
    time.sleep(5)
    xbee.send_data_async(remote, "onn")
    time.sleep(6)
    xbee.send_data_async(remote, "off")

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
