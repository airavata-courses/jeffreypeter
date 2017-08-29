# Assignment 1
## Operating System: 
- Developed in windows 10
- Tested in both Windows 10 & Ubuntu 16
## Technologies: 
Java 1.8, Python 2.7, Nodejs 6.10, Maven 3.5 and Thrift 0.10.0
### Three Components: 
1. Nodejs 
2. Python 
3. Java
### Architecture
- [Diagram](https://docs.google.com/drawings/d/19chcWVkfiW3oI-hUS-BHrzJiR2wj6C1GwNs-TODe4aw)
- Used Json String for communication between the micro-services

# Testing
## 1. Start Servers
### Steps: Java server
1. Go to java folder
```
assignment1 > java
```
2. This is optional step maynot be required if you are using Windows 10
```
mvn clean install
```
3. Start Java Server
```
java -cp target/application-1.0.jar com.sga.application.server.Server
```
### Steps: Python server 
0. (Optional) If thrift libs is not installed in Python
    - Go to thrift-0.10.0 folder and Run the below command(sudo)

```
assignment1 > python > thrift-0.10.0
```
```
python setup.py install
```
1. Go to py-impl folder
```
assignment1 > python > py-impl
```
2. Start Python Server
```
python PythonServer.py
```
### Steps: Nodejs server 
1. Go to app folder
```
assignment1 > node > app
```
2. Start nodejs Server
```
node index.js
```
## 2. Open UI
- Open Browser (once all the browsers are started)
- Open [localhost:8080](http://localhost:8080/). 
- Input text in **Input Text** field and click **Test** button
