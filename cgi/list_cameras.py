#!/usr/bin/env python3

# -*- coding: UTF-8 -*-

import sys
import cgi
import cgitb
cgitb.enable()

# Output an array of available cameras.
# TODO: Poll cameras dynamically.
print("Content-Type: text/json; charset=utf-8")
print("")
print('[{"url":"http://DOMAIN:8091/?action=stream", "name":"Exterior (South)"},')
print(' {"url":"http://DOMAIN:8092/?action=stream", "name":"Exterior (North)"},')
print(' {"url":"http://DOMAIN:8081", "name":"Garden (East)"},')
print(' {"url":"http://DOMAIN:8090/?action=stream", "name":"Exterior IR (South)"}]')
