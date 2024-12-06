import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
    connections: [
      {
        //'AMQP_USER' - это название мы сами задаём
        login: configService.get('AMQP_USER') ?? '',
        password: configService.get('AMQP_PASSWORD') ?? '',
        host: configService.get('AMQP_HOSTNAME') ?? '',
      },
    ],
    // подключимся к очереди что бы её слушать
    queueName: configService.get('AMQP_QUEUE'),
    prefetchCount: 32, //мы одновременно будем обрабатывать 32 смс
    serviceName: 'purple-account', //serviceName нам говорит какой сервис нам отправил смс
  }),
});
