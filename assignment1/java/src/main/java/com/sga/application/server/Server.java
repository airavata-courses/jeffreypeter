package com.sga.application.server;

import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TServerTransport;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TServer.Args;
import org.apache.thrift.server.TSimpleServer;

public class Server {

    public static void StartsimpleServer(ApplicationService.Processor<ApplicationServiceHandler> processor) {
        try {
            TServerTransport serverTransport = new TServerSocket(9090);
            TServer server = new TSimpleServer(
                    new Args(serverTransport).processor(processor));

            // Use this for a multithreaded server
            // TServer server = new TThreadPoolServer(new
            // TThreadPoolServer.Args(serverTransport).processor(processor));

            System.out.println("Listening at http://localhost:9090");
            server.serve();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        StartsimpleServer(new ApplicationService.Processor<ApplicationServiceHandler>(new ApplicationServiceHandler()));
    }

}