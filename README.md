
# A full stack React app on an ESP32

## No blinking lights, nothing plugged into any pins. 
## Just a full stack web app hosted on an $8 micro controller.
## Running at about 200 mA, plugged into a USB charging brick
### I got this working on an ESP32 DOIT ESP32 DevKit V1

Update [platform.ini](platformio.ini) to match the specs of your board

Set these to your WiFi credentials in the [main.cpp](src/main.cpp) file
```cpp
const char *ssid = YOUR_SSID;
const char *password = YOUR_PASSWORD;
```

This line gives your ESP32 a hostname on your network
In [main.cpp](src/main.cpp):
```cpp
WiFi.setHostname("matt");
```

Calling MDNS.begin("name-on-network") lets you connect to the app in your browser via name-on-network.local for anyone on the local network.

In [main.cpp](src/main.cpp):
```cpp
      if (!MDNS.begin("house"))
    {
        Serial.println("Error starting mDNS responder!");
        while (1)
        {
            delay(1000);
        }
    }
```

Run the commands in extra_scripts.zsh to build the react app and flash it to the ESP32.  

I followed this guide. Shout out to Shout out to Paul Ridgway:

[https://blockdev.io/react-on-the-esp32/](https://blockdev.io/react-on-the-esp32/)
