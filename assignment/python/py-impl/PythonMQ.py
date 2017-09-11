import pika
import json

credentials = pika.PlainCredentials('sgatest', 'L3tm3t38t')
parameters = pika.ConnectionParameters('149.165.168.247',
                                       5672,
                                       '/',
                                       credentials)
connection = pika.BlockingConnection(parameters)
channel = connection.channel()

channel.queue_declare(queue='sga.simple.python')

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    reqObj = json.loads(body)
    reqObj['text'] = reqObj['text']+ ":InPython"
    msg = json.dumps(reqObj, ensure_ascii=False)

    channelClnt = connection.channel()
    channel.queue_declare(queue='sga.simple.java')
    channel.basic_publish(exchange='',
                          routing_key='sga.simple.java',
                          body=msg)
    print(" [x] Sent:")
    print (msg)


channel.basic_consume(callback,
                      queue='sga.simple.python',
                      no_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()