import { RMQModule } from 'nestjs-rmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { getRMQConfig } from './configs/rmq.config';
import { getJWTConfig } from './configs/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
    RMQModule.forRootAsync(getRMQConfig()),
    JwtModule.registerAsync(getJWTConfig()),
    PassportModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}

/*  Какяа будет структура АПИ ? Если другие Сервисы мы делим на модули с точки зрения логики, то апи является неким транзакционным объектом, который принимает http и конвертирует это в наборы там rmq запросов и получает в результате данные

    Мы в сервисе будет делать логин + регистрацию, то-есть он будет знать токен и как пользователя авторизовать Юзера и зарегестрировать, у нас есть сторонний сервис в виде нашего сервиса апи который имеет исключительно знаение этого jwt секрета и дальше когда к нам прийдет какой-то запрос нам не прийдется идти в .account.env и мы сможем расшифровать наш jwt токен по-этому секрет и в .api.env и в .account.env должны быть одинаковы
*/
