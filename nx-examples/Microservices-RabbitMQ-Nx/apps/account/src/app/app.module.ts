import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.account.env',
    }),
    RMQModule.forRootAsync(getRMQConfig()),
    MongooseModule.forRootAsync(getMongoConfig()),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

/*
  Обычно у таких объектов как ConfigModule есть метод forRoot - так мы явно говорим что подключаем его в корень нашего приложения и он будет расспростронять свою конфигурацию на всё и есь forFeature - которая в отдельных модулях подключает отдельные фичи
  isGlobal: true обезпечит глобальное подключение во всем нашем приложение
  envFilePath - путь до файла конфигурации
  мы создадим папку .account.env в самом верху в папке purple, почему здесь, а не в корне ? Потому что когда мы будем собирать все приложение то оно по умолчанию будет все равно смотреть в корень откуда мы запускаем

  У MongooseModule есть методы forRoot, forRootAsync, forFeature, forFeatureAsync и разница между этими async в том что они позволяют внедрится в процесс инициализации и добавить туда какие-то зависимости. К примеру сейчас нам нужен configModule еще до того как у нас инициализируется Монгусь модуль что мы сначала прочитали переменное окружение, взяли оттуда переменные для подключения и уже потом проинициализировали MongooseModule, по-этому нам подойдёт forRootAsync
 */
