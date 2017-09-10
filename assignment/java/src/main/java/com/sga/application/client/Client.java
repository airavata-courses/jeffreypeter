package com.sga.application.client;

import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;

public class Client {

    public static void main(String[] args) {

        try {
            TTransport transport;

            transport = new TSocket("localhost", 9091);
            transport.open();

            TProtocol protocol = new TBinaryProtocol(transport);
            com.sga.application.server.ApplicationService.Client client = new com.sga.application.server.ApplicationService.Client(protocol);

            System.out.println(client.communicate("test"));

            transport.close();
        } catch (TTransportException e) {
            e.printStackTrace();
        } catch (TException x) {
            x.printStackTrace();
        }
    }

}