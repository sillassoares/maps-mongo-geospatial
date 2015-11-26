#!/bin/bash

file="file/dbmongo.jsossn"

if [ -f $file ] 
	then 
	mongoimport --db map_positions --collection positions --file $file --jsonArray
else
	echo "File not Found!"
	echo "Go to json-generator.appspot.com and create file/dbmongo.json with the result until its not automated"
fi

