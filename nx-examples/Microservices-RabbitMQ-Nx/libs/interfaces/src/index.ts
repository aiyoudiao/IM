export * from './lib/user.interface';
export * from './lib/auth.interface';

/*
Вот мы закинули что-то в библиотеку
Всё что мы можем переиспользовать - должно быть в библиотеках
Мы не можем что-то взять из одного приложения и переиспользовать в другом, оно должно быть вынесенно библиотекой !
Теперь зайдём в apps->account->src->app->app.controller и попытаемся сделать импорт
import { IUser } from '@purple/interfaces'; //и это ссылка не на npm пакет, это будет ссылка на библиотеку внутри нашего проекта
import {IUser} from "@purple/interfaces" - это будет валидно
Зайдём в tsconfig.base.json
"paths": {
      "@purple/interfaces": ["libs/interfaces/src/index.ts"]
}
засчет этого у нас работает такой красивый алиас, он говорит что @purple/interfaces будет ссылаться на libs/interfaces/src/index.ts
Засчет того что у нас есть этот path, а в каждом из проектов если мы зайдем в tsconfig(apps->account->src->tsconfig), то мы увидем там что они ссылаются на base те:
"extends": "../../tsconfig.base.json",
то мы можем в любом месте где нам необходимо импортировать кусочек нашей библиотеки import {IUser} from "@purple/interfaces"

Теперь в папке app все удалим кроме app.module.ts
И как мы можем генерить какой-то модуль внутри нашего приложения ?
Мы можем это делать с помощью того же генератора
Вместо того что бы указывать что мы будем использовать генератор какого-то плагина, мы можем nx g module и нам понадобится модуль пользователя
только здесь единственая особенность что мы хотим сослаться не просто на users, а указать что мы находимся в папке app внутри
nx g module app/user --project=account
Вот в такой записи nx под собой вызовет cli и сгенерит нам модуль
Тоже самое будет и с контроллером и с сервисом !

Если нам нужно установить зависимости, то будет все точно так же как в обычных проектах - npm i bcryptjs
 */
