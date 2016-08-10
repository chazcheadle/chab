#!/usr/bin/env python3

# -*- coding: UTF-8 -*-

from datetime import datetime, timedelta
import time
import numpy
import sys

import ephem
import cgi
import cgitb
cgitb.enable()

today = time.strftime("%Y/%m/%d")

# lat and long in decimal format (note long is Easting)
lat = numpy.deg2rad(42.1423)
long = numpy.deg2rad(102.8580)

obs = ephem.Observer()
obs.lat = lat
obs.long = long
obs.elevation = 126
obs.date = ephem.now()

sun = ephem.Sun(obs)
sun.compute(obs)
altitude = str('%3.2f' % numpy.rad2deg(sun.alt))
azimuth = str('%3.2f' % numpy.rad2deg(sun.az))
sunrise = str(ephem.localtime(obs.next_rising(sun, start=today)).isoformat())
solar_noon = str(ephem.localtime(obs.next_transit(sun, start=today)).isoformat())
sunset = str(ephem.localtime(obs.next_setting(sun, start=today)).isoformat())

# Allow for shell or CGI output.
if sys.stdin.isatty() == False:
  print("Content-Type: text/json; charset=utf-8")
  print("")
  print('{"sunData":')
  print('  {')
  print('    "altitude":"' + altitude + '",')
  print('    "azimuth":"' + azimuth + '",')
  print('    "sunrise":"' + sunrise + '",')
  print('    "solar_noon":"' + solar_noon + '",')
  print('    "sunset":"' + sunset + '"')
  print('  }')
  print('}')
else:
  print('Altitude: ' + altitude)
  print('Azimuth: ' + azimuth)
  print('Sunrise: ' + sunrise)
  print('Solar noon: ' + solar_noon)
  print('Sunset: ' + sunset)
