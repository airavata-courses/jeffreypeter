#!/bin/bash
echo -------------Build started-------------
echo IN::$PWD;
# Delete all containers
docker rm -f $(docker ps -a -q) || echo No Docker images
# Delete all images
docker rmi -f $(docker images -q) || echo No Docker containers
docker pull jeffrav/gateway;docker pull jeffrav/nodejs:latest;docker pull jeffrav/python:latest;docker pull jeffrav/java:latest;
docker run -d --name gateway -p 8000:8000 -it jeffrav/gateway;
docker run -d --name nodejs jeffrav/nodejs;
docker run -d --name python jeffrav/python;
docker run -d --name java jeffrav/java;