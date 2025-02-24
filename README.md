

I got this working on an ESP32 S2 Mini and a DOIT ESP32 DevKit V1

Update [platform.ini](platformio.ini) to match the specs of your board

Set these to your WiFi credentials in the [main.cpp](src/main.cpp) file
```cpp
const char *ssid = YOUR_SSID;
const char *password = YOUR_PASSWORD;
```

These lines let you give your React app a hostname that you can connect to from your local network.  In this case, visiting matt.local in the browser is the same as connecting to the ip address, the React app will be served.
```cpp
WiFi.setHostname("matt");
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