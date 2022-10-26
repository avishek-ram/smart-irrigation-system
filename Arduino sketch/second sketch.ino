#include<XBee.h>

const int dry = 480;
const int wet = 204;

XBee xbee = XBee();
uint8_t payload[] = {0,0,0,0,0,0,0,0,0,0};
XBeeAddress64 addr64 = XBeeAddress64(0x0013a200, 0x41d49240);//cordinator 64bit address can also set to zeros
ZBTxRequest tx = ZBTxRequest(addr64, payload, sizeof(payload));

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  xbee.setSerial(Serial);
}

void loop() {
  // put your main code here, to run repeatedly:
  char charhumid[] = {'t','t','t','t'};  
  int sensorVal = analogRead(A0);
  Serial.println(sensorVal);
  int percentageHumidity = map(sensorVal, wet, dry, 100, 0);
  String strHumidity = String(percentageHumidity);
  strHumidity.toCharArray(charhumid,4);

  Serial.print(percentageHumidity);
  Serial.println("%");
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
  delay(3000);
}
