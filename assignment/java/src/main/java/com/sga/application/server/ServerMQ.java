package com.sga.application.server;

import com.rabbitmq.client.*;
import java.io.IOException;
import org.json.JSONException;
import org.json.JSONObject;

public class ServerMQ {
    private final static String QUEUE_NAME = "sga.simple.java";
    private final static String EXCHANGE_NAME= "sga.job";
    private final static String ROUTING_KEY= "job.closed";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("149.165.168.247");
        factory.setUsername("sgatest");
        factory.setPassword("L3tm3t38t");

        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        Consumer consumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body)
                    throws IOException {
                String message = new String(body, "UTF-8");
                System.out.println(" [x] Received '" + message + "'");
                JSONObject obj = new JSONObject(message);
                java.lang.String text = obj.getString("text") + ":InJava";
                System.out.println("text::"+text);
                obj.put("text",text);

                try {
                    ConnectionFactory factory = new ConnectionFactory();
                    factory.setHost("149.165.168.247");
                    factory.setUsername("sgatest");
                    factory.setPassword("L3tm3t38t");

                    Connection connection = factory.newConnection();
                    Channel channel = connection.createChannel();
                    channel.exchangeDeclare(EXCHANGE_NAME, "topic",true);
                    message = obj.toString();
                    channel.basicPublish(EXCHANGE_NAME, ROUTING_KEY, null, message.getBytes());
                    System.out.println(" [x] Sent '" + ROUTING_KEY + "':'" + message + "'");
                    connection.close();

                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        };
        channel.basicConsume(QUEUE_NAME, true, consumer);
    }


}