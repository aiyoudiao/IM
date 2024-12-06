import { IsEmail, IsString } from 'class-validator';

export namespace AccountLogin {
  export const topic = 'account.login.command'; // это будет нашим биндингом, который при прибиндим к purple.account(очередь)

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
  }

  export class Response {
    access_token: string;
  }
}

/*  Почему мы используем namespace а не класс, потому что нам нужно что бы внутри были классы, на них мы будем навешивать декораторы валидации и нам нужны именно отдельные классы Реквеста и Респонса, а просто объеденить в один класс - не хорошо потому что будет класс в классе
    Нам важной что бы Requesr и Response были менно классами что бы мы смогил их валидирировать с помощью class-validator

    Мы описали контркты логина пользователя
    топик по которому мы отправляем
    Реквест - что мы должны отправить
    Респонс - что должны получить

    И мы подключим теперь этот AccountLogin в наш микросервис

*/
