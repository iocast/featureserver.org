#!/usr/bin/python

from datetime import datetime

fmt = "%H:%M:%S"

midnight = "23:59:59"
now = datetime.now().strftime(fmt)

print datetime.strptime(midnight, fmt) - datetime.strptime(now, fmt)
