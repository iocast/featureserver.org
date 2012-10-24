#!/usr/bin/env python

from pyspatialite import dbapi2 as db
import os

file="/Users/michel/Documents/Projects/workspace.sqlite"

srs = 4326

sql_point = "CREATE TABLE fs_point (fid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
sql_line = "CREATE TABLE fs_line (fid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
sql_polygon = "CREATE TABLE fs_polygon (fid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"



if os.path.exists(file):
    os.remove(file)

connection = db.connect(file)
cursor = connection.cursor()

cursor.execute('SELECT InitSpatialMetadata()')

cursor.execute(sql_point)
cursor.execute('''SELECT AddGeometryColumn('fs_point', 'geometry', %i, '%s', 2);''' % (int(srs), "POINT"))

cursor.execute(sql_line)
cursor.execute('''SELECT AddGeometryColumn('fs_line', 'geometry', %i, '%s', 2);''' % (int(srs), "LINESTRING"))

cursor.execute(sql_polygon)
cursor.execute('''SELECT AddGeometryColumn('fs_polygon', 'geometry', %i, '%s', 2);''' % (int(srs), "POLYGON"))



connection.commit()
connection.close()
