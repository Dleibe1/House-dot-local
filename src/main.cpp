#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ESPmDNS.h>
#include <LittleFS.h>
#include "env.h"
#include "ArduinoJson.h"

const char *ssid = YOUR_SSID;
const char *password = YOUR_PASSWORD;

AsyncWebServer server(80);

void setup()
{
    Serial.begin(115200);
    WiFi.setHostname("matt");
    // Connect to WiFi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi...");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nWiFi connected!");

    // Print the ESP32 IP Address
    Serial.print("ESP32 IP Address: ");
    Serial.println(WiFi.localIP());

    if (!MDNS.begin("matt"))
    {
        Serial.println("Error starting mDNS responder!");
        while (1)
        {
            delay(1000);
        }
    }
    // Initialize LittleFS instead of SPIFFS
    if (!LittleFS.begin(true))
    {
        Serial.println("LittleFS initialization failed!");
        return;
    }

    Serial.println("LittleFS Contents:");
    File root = LittleFS.open("/");
    File file = root.openNextFile();

    while (file)
    {
        Serial.print("File: ");
        Serial.println(file.name());
        file = root.openNextFile();
    }
    // Serve files from LittleFS instead of SPIFFS
    server.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");
    server.serveStatic("/static/", LittleFS, "/");
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/index.html", "text/html"); });

    server.on("/api/who-did-what-last", HTTP_GET, [](AsyncWebServerRequest *request)
              {
                        // Open the file in read mode. Note the path starts with "/" and includes the subdirectory.
                        File file = LittleFS.open("/api/whoDidWhatLast.json", "r");
                        if (!file) {
                          request->send(404, "application/json", "{\"error\":\"File not found\"}");
                          return;
                        }
                        
                        // Read the file into a String. You can also use file.readString() if preferred.
                        String fileContent;
                        while (file.available()) {
                          fileContent += (char)file.read();
                        }
                        file.close();
                      
                        // Send the file contents as a JSON response.
                        request->send(200, "application/json", fileContent); });

    server.onNotFound([](AsyncWebServerRequest *request)
                      { request->send(LittleFS, "/index.html", "text/html"); });

    server.begin();
    Serial.println("Server started!");
}

void loop() {}
