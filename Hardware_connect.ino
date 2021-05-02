#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "";
const char* password = "";

int incomingByte = 0;
String serverName = "http://localhost:3000/response";


#include <ESP32_Servo.h>
Servo servo; 



unsigned long lastTime = 0;



unsigned long timerDelay = 5000;

void setup() {
  Serial.begin(9600); 

//wifi setup 
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network: ");
  Serial.println(WiFi.localIP());

  //Servo setup 
   servo.attach(16);
  servo.write(0);
  delay(2000);
 
 
}

void loop() {

  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

     
      
      // IOT Link to server 
      http.begin("http://localhost:3000/response");
      
      // Send HTTP GET request
      int httpCode = http.GET();
      
      if (httpCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpCode);
      }
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
    //Read from serial 
    if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();

    if (incomingByte==1){
        servo.write(110);
        delay(1000);
      }
      servo.write(0);

      
    }
}
