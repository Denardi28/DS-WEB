
void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}


void loop() {
  if (Serial.available() > 0){
    char comando = Serial.read();

  if (comando == 'L' || comando == 'l'){
    digitalWrite(13, HIGH);  
  }
  if (comando == 'D' || comando == 'd'){
    digitalWrite(13, LOW);  
  }
  
  while (comando == 'P' || comando == 'p'){
    digitalWrite(13, HIGH);  
    delay(3000);                      
    digitalWrite(13, LOW); 
    delay(3000);
  char desligar = Serial.read();
    if (desligar == 'A'){
      break;
    }
  }
  }
  

}                     