############################################################
# Dockerfile to build Gateway Microservice
# Based on Ubuntu
############################################################
# Set the base image to Ubuntu
FROM ubuntu:latest

# File Author / Maintainer
MAINTAINER Jeffrey Ravindran <jeffravi@iu.edu>

# Install Modules
RUN apt-get update 
RUN apt-get install -y git python3 python3-pip

WORKDIR /home

COPY startup.sh /home/startup.sh

RUN chmod 700 /home/startup.sh

# Checking out Code base
RUN git clone https://github.com/airavata-courses/jeffreypeter.git

# Installing dependencies
RUN pip3 install pika

# Starting the Server
CMD /home/startup.sh
