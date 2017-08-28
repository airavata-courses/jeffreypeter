
#!/usr/bin/env python
 
import sys
sys.path.append('../gen-py')
 
from application import ApplicationService
from application.ttypes import *
from application.constants import *
 
from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
 
try:
  # Make socket
  transport = TSocket.TSocket('localhost', 9091)
 
  # Buffering is critical. Raw sockets are very slow
  transport = TTransport.TBufferedTransport(transport)
 
  # Wrap in a protocol
  protocol = TBinaryProtocol.TBinaryProtocol(transport)
 
  # Create a client to use the protocol encoder
  client = ApplicationService.Client(protocol)
 
  # Connect!
  transport.open()
  print "Before communicate"
  msg = client.communicate("test")
  print msg
 
  transport.close()
 
except Thrift.TException, tx:
  print "%s" % (tx.message)