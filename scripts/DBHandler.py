#!/usr/bin/python

import os
from datetime import datetime
from pyspatialite import dbapi2 as db

class DBHandler(object):
    
    fmt = "%Y-%m-%d"
    
    sql_point = "CREATE TABLE fs_point (fid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
    sql_line = "CREATE TABLE fs_line (fid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
    sql_polygon = "CREATE TABLE fs_polygon (fid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"


    def __init__(self, file, srs):
        self.file = file
        self.srs = srs

    def create(self, force = True):
        if os.path.exists(self.file) and not force:
            return
        elif os.path.exists(self.file):
            os.remove(self.file)

        connection = db.connect(self.file)
        cursor = connection.cursor()
    
        cursor.execute('SELECT InitSpatialMetadata()')
    
        cursor.execute(self.sql_point)
        cursor.execute('''SELECT AddGeometryColumn('fs_point', 'geometry', %i, '%s', 2);''' % (int(self.srs), "POINT"))
    
        cursor.execute(self.sql_line)
        cursor.execute('''SELECT AddGeometryColumn('fs_line', 'geometry', %i, '%s', 2);''' % (int(self.srs), "LINESTRING"))
    
        cursor.execute(self.sql_polygon)
        cursor.execute('''SELECT AddGeometryColumn('fs_polygon', 'geometry', %i, '%s', 2);''' % (int(self.srs), "POLYGON"))
    
    
        sql_clean = "CREATE TABLE fs_clean (id INTEGER PRIMARY KEY AUTOINCREMENT, clean_date TEXT);"
        cursor.execute(sql_clean)
    
        now = datetime.now().strftime(self.fmt)
    
        cursor.execute("INSERT INTO fs_clean(\"clean_date\") VALUES(date('"+now+"'));")
    
    
        connection.commit()
        connection.close()

    
    def reset(self):
        if not os.path.exists(self.file):
            raise IOError('Database not exists!')
        
        now = datetime.now().strftime(self.fmt)

        connection = db.connect(self.file)
        cursor = connection.cursor()
            
        cursor.execute("SELECT MAX(id) AS \"id\", \"clean_date\" FROM fs_clean;")
        clean_date = cursor.fetchone()[1]

        connection.close();

        if now > clean_date:
            self.create()
        