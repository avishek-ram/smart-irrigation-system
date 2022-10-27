#include<XBee.h>

const int dry = 480;
const int wet = 204;
const int RELAY_PIN = 3;

XBee xbee = XBee();
uint8_t payload[] = {0,0,0,0,0,0,0,0,0,0};
uint8_t rxPayload[]= {0,0,0};
XBeeAddress64 addr64 = XBeeAddress64(0x0013a200, 0x41d49240);//cordinator 64bit address can also set to zeros

ZBTxRequest tx = ZBTxRequest(addr64, payload, sizeof(payload));
XBeeResponse response = XBeeResponse();
ZBRxResponse rx = ZBRxResponse();
ModemStatusResponse msr = ModemStatusResponse();

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  xbee.setSerial(Serial);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);  //ReLAY USED IN PROJECT IS active low. HIGH => off, LOW => on pump
}

void loop() {
  // put your main code here, to run repeatedly:
  //send moisture data
  char charhumid[] = {'t','t','t','t'};  
  int sensorVal = analogRead(A0);
  int percentageHumidity = map(sensorVal, wet, dry, 100, 0);
  String strHumidity = String(percentageHumidity);
  strHumidity.toCharArray(charhumid,4);

  payload[0] = 'm';
  payload[1] = 'o';
  payload[2] = 'i';
  payload[3] = 's';
  payload[4] = 't';
  payload[5] = ':';

  int payindx = 5;
  for(int i=0; i<4; i++){
    payindx++;
    if(charhumid[i] != 't'){
      payload[payindx] = charhumid[i];
    }
  }
  xbee.send(tx);

  //recieve pump status and trigger pump
  xbee.readPacket();
  if (xbee.getResponse().isAvailable())
  {
    // got something
    if (xbee.getResponse().getApiId() == ZB_RX_RESPONSE) {
      // got a zb rx packet
      // now fill our zb rx class
      xbee.getResponse().getZBRxResponse(rx);
      rxPayload[0] = rx.getData(0);
      rxPayload[1] = rx.getData(1);
      rxPayload[2] = rx.getData(2);
      if(rxPayload[0] == 'o' && rxPayload[1] == 'n' && rxPayload[2] == 'n')
      { //turn pump on
        //Serial.println("pump is on");
        digitalWrite(RELAY_PIN, LOW);
      }else{ //turn pump off
        digitalWrite(RELAY_PIN, HIGH);
      } 
    } else if (xbee.getResponse().getApiId() == MODEM_STATUS_RESPONSE) {
      xbee.getResponse().getModemStatusResponse(msr);
    } else {
      // not something we were expecting   
    }
  }
  else if (xbee.getResponse().isError()) {
    //nss.print("Error reading packet.  Error code: ");  
    //nss.println(xbee.getResponse().getErrorCode());
  }
  delay(2000);
}
