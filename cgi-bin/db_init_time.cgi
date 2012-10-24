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

out = str(callback) + "({"

out = out + "remaining_time : "
out = out + "'" + str(datetime.strptime(midnight, fmt) - datetime.strptime(now, fmt)) + "'"
out = out + "});"

print 'Content-Type: application/json\n\n'
print out


