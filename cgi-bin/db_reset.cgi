#!/usr/bin/env python

import os
import sys
import cgi
from datetime import datetime
from pyspatialite import dbapi2 as db


# check if db need to be reset
file="/home/featureserver/workspace.sqlite"

if not os.path.exists(file):
    form = cgi.FieldStorage()
    callback = form.getvalue("callback")
    
    out = str(callback) + "({"
    out = out + "\"remaining_time\" : \"00:00:00\""
    out = out + ", \"error\" : \"database not ready\""
    out = out + "});"
    
    print 'Content-Type: application/json\n\n'
    print out
    
    sys.exit(0)


fmt = "%Y-%m-%d"
now = datetime.now().strftime(fmt)

connection = db.connect(file)
cursor = connection.cursor()

cursor.execute("SELECT MAX(id) AS \"id\", \"clean_date\" FROM fs_clean;")
clean_date = cursor.fetchone()[1]

connection.close();

if now > clean_date:
    import subprocess
    p = subprocess.Popen(["cgi-bin/db_create.cgi"])
    p.wait()



# return remaining time
form = cgi.FieldStorage()
callback = form.getvalue("callback")

fmt = "%H:%M:%S"

midnight = "23:59:59"
now = datetime.now().strftime(fmt)


remaining = str(datetime.strptime(midnight, fmt) - datetime.strptime(now, fmt))

if int(remaining[:remaining.find(":")]) < 10:
    remaining = "0" + remaining

out = str(callback) + "({"
out = out + "\"remaining_time\" : "
out = out + "\"" + remaining + "\""
out = out + "});"

print 'Content-Type: application/json\n\n'
print out


