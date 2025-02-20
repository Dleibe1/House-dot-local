#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <LittleFS.h>  // Change from SPIFFS.h to LittleFS.h

const char* ssid = "yourssid";
const char* password = "yourpw";

AsyncWebServer server(80);

void setup() {
    Serial.begin(115200);

    // Connect to WiFi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nWiFi connected!");

    // Print the ESP32 IP Address
    Serial.print("ESP32 IP Address: ");
    Serial.println(WiFi.localIP());

    // Initialize LittleFS instead of SPIFFS
    if (!LittleFS.begin(true)) {
        Serial.println("LittleFS initialization failed!");
        return;
    }

    Serial.println("LittleFS Contents:");
    File root = LittleFS.open("/");
    File file = root.openNextFile();

    while (file) {
        Serial.print("File: ");
        Serial.println(file.name());
        file = root.openNextFile();
    }

    // Serve files from LittleFS instead of SPIFFS
    server.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");
    server.serveStatic("/static/", LittleFS, "/");
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(LittleFS, "/index.html", "text/html");
    });

    server.onNotFound([](AsyncWebServerRequest *request){
        request->send(LittleFS, "/index.html", "text/html");
    });

    server.begin();
    Serial.println("Server started!");
}

void loop() {}
