
# A full stack React app on an ESP32
🚧 This readme is still a work in progress 🚧
## No blinking lights, nothing plugged into any pins, still does something cool.
## A working full stack React web app hosted on a [$9 micro controller](https://www.amazon.com/ESP-WROOM-32-Development-Microcontroller-Integrated-Compatible/dp/B07WCG1PLV/ref=sr_1_3?dib=eyJ2IjoiMSJ9.XBINg-sjhfF_gUtnMiKGjjEQQzaaOnS0BOX5B4WtqfLMYUub-A1GOALt3HxF_ltfwmsF1huTZqdb_GPfN7YgqBCPEWnZZEoSis5a2gL0lbApUkGkdrTqSVIZIK84BpLlgQyAlFxEeeDBYWmaTW-S-6HRvfIgAD6uxfau0-KkxZA1I_s7jVhrCfheWcDCVOYpVdbJe0Dr20tsEn3N8AtdCb1pBBWHiAy1aa-jG9200dY.avrbviAOUNPIh2avs_Og0ooquN4gcQFaWDeXi74dtg0&dib_tag=se&hvadid=557376324384&hvdev=c&hvlocphy=9007909&hvnetw=g&hvqmt=e&hvrand=5589188309751002162&hvtargid=kwd-462782567668&hydadcr=24328_13517622&keywords=esp32%2Bamazon&mcid=36bbc68ae03b3a6fa1ca8dca6f0091c1&qid=1740456180&sr=8-3&th=1), running at about 200 mA.

[This guide by Paul Ridgway](https://blockdev.io/react-on-the-esp32/) gave me a good start with flashing the React app to the ESP32 and hosting it with the [ESPAsyncWebServer](https://github.com/lacamera/ESPAsyncWebServer) library.  From there I created some routes to read and write data to [this JSON file](src/whoDidWhatLast.json).

I am using an esp32 doit-devkit-v1.  It is important that you use this same microcontroller, as the settings in the [no_ota.csv](no_ota.csv) file may not be the same!

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

To connect to your ESP32 outside your local network, you will need to learn how to use port forwarding with the ESP32's ip address.

Run the commands in extra_scripts.zsh to build the react app and flash it to the ESP32.

This is still a work in progress.  I made it for my roommates and I to keep track of who did what chores last.  The fetch requests read and write to a single JSON file.  

I wanted to see if I could set up a web app with something like REST API integration on an ESP32 with no external hardware.

The app isn't pretty, I may make a template version of this to just have working GET and POST routes and their respective fetch requests in react, along with basic routing setup.  Unless the people at your place are also named Ryan, Eden, and Dan and you don't mind your app looks like it was made in 2004.
