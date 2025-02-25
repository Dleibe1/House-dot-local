
# A full stack React app on an ESP32
## No blinking lights, nothing plugged into any pins, still something awesome.
## A working full stack React web app hosted on a [$9 micro controller](https://www.amazon.com/ESP-WROOM-32-Development-Microcontroller-Integrated-Compatible/dp/B07WCG1PLV/ref=sr_1_3?dib=eyJ2IjoiMSJ9.XBINg-sjhfF_gUtnMiKGjjEQQzaaOnS0BOX5B4WtqfLMYUub-A1GOALt3HxF_ltfwmsF1huTZqdb_GPfN7YgqBCPEWnZZEoSis5a2gL0lbApUkGkdrTqSVIZIK84BpLlgQyAlFxEeeDBYWmaTW-S-6HRvfIgAD6uxfau0-KkxZA1I_s7jVhrCfheWcDCVOYpVdbJe0Dr20tsEn3N8AtdCb1pBBWHiAy1aa-jG9200dY.avrbviAOUNPIh2avs_Og0ooquN4gcQFaWDeXi74dtg0&dib_tag=se&hvadid=557376324384&hvdev=c&hvlocphy=9007909&hvnetw=g&hvqmt=e&hvrand=5589188309751002162&hvtargid=kwd-462782567668&hydadcr=24328_13517622&keywords=esp32%2Bamazon&mcid=36bbc68ae03b3a6fa1ca8dca6f0091c1&qid=1740456180&sr=8-3&th=1), running at about 200 mA.
### This example is for an ESP32 DOIT ESP32 DevKit V1
[This guide by Paul Ridgway](https://blockdev.io/react-on-the-esp32/) gave me a good start with flashing the React app to the ESP32 and hosting it with the [ESPAsyncWebServer](https://github.com/lacamera/ESPAsyncWebServer) library.  From there I created some routes to read and write data from a [JSON file](src/whoDidWhatLast.json).

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

With this setup, I can connect to my app at house.local in the address bar of any browser so long as I'm also connected to my local wifi network.

Run the commands in extra_scripts.zsh to build the react app and flash it to the ESP32.  

I followed this guide. Shout out to Shout out to Paul Ridgway:

[https://blockdev.io/react-on-the-esp32/](https://blockdev.io/react-on-the-esp32/)
