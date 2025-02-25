
# A full stack React app on an ESP32

## No blinking lights, nothing plugged into any pins, just a full stack web app hosted on an $8 micro controller
I got this working on an ESP32 S2 Mini and a DOIT ESP32 DevKit V1

Update [platform.ini](platformio.ini) to match the specs of your board

Set these to your WiFi credentials in the [main.cpp](src/main.cpp) file
```cpp
const char *ssid = YOUR_SSID;
const char *password = YOUR_PASSWORD;
```

This line gives your ESP32 a hostname on your network
```cpp
WiFi.setHostname("matt");
```

Calling MDNS.begin("matt") allows you to navigate in your browser to matt.local.  Give this any name you want.  You will only be able to access the app if the device you're accessing the app from is also on the local network.
```cpp
if (!MDNS.begin("matt"))
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
