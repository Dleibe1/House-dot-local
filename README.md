Update platform.ini to match the specs of your board

Run the pio commands in extra_scripts.zsh to build the react code and flash the LittleFS image containing it.  The guide below has you do it with an extra_script.py file he wrote, but I couldn't get it to run properly.  I might prefer it this way anyway because if you're only making changes to your C++ code, you don't need to build and flash the React app, which takes extra time.


I followed this guide for the most part:

[https://blockdev.io/react-on-the-esp32/](https://blockdev.io/react-on-the-esp32/)

Shout out to Paul Ridgway