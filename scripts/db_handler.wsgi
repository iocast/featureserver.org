#!/usr/bin/python

import sys, os, traceback
from cgi import parse_qs, escape
from datetime import datetime
from DBHandler import DBHandler



def application(environ, start_response):

    parameters = parse_qs(environ.get('QUERY_STRING', ''))
    callback = subject = escape(parameters['callback'][0])

    output = str(callback) + "({"
    
    
    
    # check reset
    db = DBHandler("/osgeo/featureserver/fs-server/workspace.sqlite", 4326)
    try:
        db.reset()
    except Exception as e:
        db.create()
        output = output + "\"remaining_time\" : \"" + str(e) + "\", "
    
    # calcualte remaining time

    fmt = "%H:%M:%S"

    midnight = "23:59:59"
    now = datetime.now().strftime(fmt)

    remaining = str(datetime.strptime(midnight, fmt) - datetime.strptime(now, fmt))

    if int(remaining[:remaining.find(":")]) < 10:
        remaining = "0" + remaining

    
    output = output + "\"remaining_time\" : "
    output = output + "\"" + remaining + "\""
    output = output + "});"

    response_headers = [('Content-type', 'application/json'),
                        ('Content-Length', str(len(output)))]
    start_response('200 OK', response_headers)

    #return [output]
    yield output
    