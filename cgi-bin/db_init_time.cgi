#!/usr/bin/env python

'''
test: python -m CGIHTTPServer 8000
doc: http://svn.osgeo.org/featureserver/trunk/featureserver/doc/
'''

import cgi
from datetime import datetime

form = cgi.FieldStorage()
callback = form.getvalue("callback")

fmt = "%H:%M:%S"

midnight = "23:59:59"
now = datetime.now().strftime(fmt)


remaining = str(datetime.strptime(midnight, fmt) - datetime.strptime(now, fmt))

if int(remaining[:remaining.find(":")]) < 10:
    remaining = "0" + remaining

out = str(callback) + "({"
out = out + "remaining_time : "
out = out + "'" + remaining + "'"
out = out + "});"

print 'Content-Type: application/json\n\n'
print out


