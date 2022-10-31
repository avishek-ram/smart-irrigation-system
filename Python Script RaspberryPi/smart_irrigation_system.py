import sys
import time
import os
import json
import serial
import threading
import requests
from digi.xbee.devices import XBeeDevice, RemoteXBeeDevice, XBee64BitAddress

# Define the callback.
def my_data_received_callback(xbee_message):
    address = xbee_message.remote_device.get_64bit_addr()
    data = xbee_message.data.decode("utf8")
    datastr = str(data)
    datastr = datastr.rstrip('\x00')
    datastr = datastr[6:]
    if int(datastr) < 0:
        datastr = "0"
    elif int(datastr) > 100:
        datastr = "100"

    #print("Received data from %s: %s" % (address, data))
    payload = {
        'moisture' : datastr,
        'gardenid' : '1',
    }
    response = requests.post("https://smartirrigationfiji.com/Home/sendMoisture", params= payload)

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
    # Get data from server Send data using the remote Zigbee.
    newStatus = None
    while True :
        time.sleep(0.8)
        response = requests.get("https://smartirrigationfiji.com/Home/togglepump", params= {'gardenid' : '1'})
        if newStatus is not response.text[1:-1]:
            newStatus = response.text[1:-1]
            xbee.send_data_async(remote, newStatus)

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
