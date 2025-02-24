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
    WiFi.setHostname("house");
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

    if (!MDNS.begin("house"))
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

    server.on("/api/who-did-what-last", HTTP_POST, [](AsyncWebServerRequest *request) {
                          // Ensure there's a JSON body provided.
                          if (!request->hasArg("plain")) {
                              request->send(400, "application/json", "{\"error\":\"No JSON body provided\"}");
                              return;
                          }
                      
                          // Retrieve the JSON payload from the request body.
                          String payload = request->arg("plain");
                      
                          // --- Step 1: Read the existing JSON file ---
                          File file = LittleFS.open("/api/whoDidWhatLast.json", "r");
                          if (!file) {
                              request->send(500, "application/json", "{\"error\":\"File could not be opened for reading\"}");
                              return;
                          }
                          String fileContent = file.readString();
                          file.close();
                      
                          // --- Step 2: Parse the JSON file ---
                          // Create a DynamicJsonDocument with enough capacity (adjust size as needed)
                          DynamicJsonDocument doc(1024);
                          DeserializationError error = deserializeJson(doc, fileContent);
                          if (error) {
                              request->send(500, "application/json", "{\"error\":\"Failed to parse JSON file\"}");
                              return;
                          }
                      
                          // --- Step 3: Parse the payload for the new element ---
                          DynamicJsonDocument payloadDoc(256);
                          error = deserializeJson(payloadDoc, payload);
                          if (error) {
                              request->send(400, "application/json", "{\"error\":\"Failed to parse JSON payload\"}");
                              return;
                          }
                          // Expecting the payload to have a field named "newElement"
                          const char* newElement = payloadDoc["newElement"];
                          if (newElement == nullptr) {
                              request->send(400, "application/json", "{\"error\":\"No newElement provided\"}");
                              return;
                          }
                      
                          // --- Step 4: Modify the JSON ---
                          // Get the array for "ryan" and add the new element.
                          JsonArray ryanArray = doc["ryan"].as<JsonArray>();
                          if (ryanArray.isNull()) {
                              request->send(500, "application/json", "{\"error\":\"'ryan' array not found in JSON file\"}");
                              return;
                          }
                          ryanArray.add(newElement);
                      
                          // --- Step 5: Write the updated JSON back to the file ---
                          file = LittleFS.open("/api/whoDidWhatLast.json", "w");
                          if (!file) {
                              request->send(500, "application/json", "{\"error\":\"File could not be opened for writing\"}");
                              return;
                          }
                          if (serializeJson(doc, file) == 0) {
                              request->send(500, "application/json", "{\"error\":\"Failed to write JSON to file\"}");
                              file.close();
                              return;
                          }
                          file.close();
                      
                          // --- Respond with success ---
                          request->send(200, "application/json", "{\"status\":\"JSON updated successfully\"}");
                      });

    server.onNotFound([](AsyncWebServerRequest *request)
                      { request->send(LittleFS, "/index.html", "text/html"); });

    server.begin();
    Serial.println("Server started!");
}

void loop() {}
