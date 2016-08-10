# Personal home monitoring project.

![Screenshot](https://github.com/chazcheadle/chab/blob/master/chab-screenshot.png)

## This is WIP, a work-in-progress.
### (Not to be confused with a 'Whip' nor a 'Nae Nae').

The basic concept was a webpage to show temperature data at my house.

... then I saw The Martian and the HUD displays (i.e., helmet and Hab cam) ensorcelled me and I got a little carried away.

The app now is a loosely knit framework of components that I built as needed with whatever language I was most familiar with.

AngularJS SPA:
- Camera display/control
- Display sensor data
- Update Sun ephem data

MQTT ([Mosquitto](https://mosquitto.org/)/[Paho](http://www.eclipse.org/paho/))
- Publish server date/time
- Publish sensor(s) data
- Subscribe to sensor nodes

Server-side Python APIs:
- Sun data ([ephem](https://pypi.python.org/pypi/pyephem/))
- Available cameras

The camera sources can be anything that a browser can render (image/mjpeg)
Currently they pull from [Motion](http://www.lavrsen.dk/foswiki/bin/view/Motion/WebHome) or [mjpeg-streamer](https://sourceforge.net/projects/mjpg-streamer/) running on some [Raspberry Pi's](http://www.raspberrypi.org)
If there is more than one camera available the page will cycle through them.

Sensor nodes:
I like to support local business and you won't find a better one than [Adafruit Industries](http://www.adafruit.com).
The nodes provide WiFi connectivity to publish data to the Mosquitto server.
- [Adafruit Feather Huzzah](https://www.adafruit.com/product/2821) + [MCP9808](https://www.adafruit.com/products/1782) (temperature)
- [Adafruit ESP8266](https://www.adafruit.com/products/2471) + [BME280](https://www.adafruit.com/products/2652) (barometer, temperature, humidity) [code](https://gist.github.com/chazcheadle/c1d047b0315befbf1472)

TODO:
Sass
Responsive layout
User-configurableoverlay components
Spellcheck
User authentication
Image/stream prefetching

