#!/usr/bin/env python
 
import sys
sys.path.append('../gen-py')
import json
 
from application import ApplicationService
from application.ttypes import *
 
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer
 
import socket
 
class ApplicationServiceHandler:
	def __init__(self):
		self.log = {}
		
	def client(self,request):
		try:
			# Make socket
			transport = TSocket.TSocket('localhost', 9090)
			# Buffering is critical. Raw sockets are very slow
			transport = TTransport.TBufferedTransport(transport)
			# Wrap in a protocol
			protocol = TBinaryProtocol.TBinaryProtocol(transport)
			# Create a client to use the protocol encoder
			client = ApplicationService.Client(protocol)
			# Connect!
			transport.open()
			print "calling Java Server"
			msg = client.communicate(request)
			print msg
			transport.close()
			return msg
		except Thrift.TException, tx:
			print "%s" % (tx.message)
		

	def communicate(self, input):
		print input
		reqObj = json.loads(input)
		reqObj['text'] = reqObj['text']+ ":InPython"
		print reqObj['text']
		resStr = json.dumps(reqObj, ensure_ascii=False)
		
		resStr = self.client(resStr)
		return resStr
		
handler = ApplicationServiceHandler()
processor = ApplicationService.Processor(handler)
#transport = TSocket.TServerSocket(port=9091)
transport = TSocket.TServerSocket(host='127.0.0.1', port=9091) 
tfactory = TTransport.TBufferedTransportFactory()
pfactory = TBinaryProtocol.TBinaryProtocolFactory()
 
server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)
 
print "Starting python server..."
server.serve()
print "done!"