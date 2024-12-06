import { IUser, UserRole } from '@purple/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;

  constructor(user: IUser) {
    this._id = user._id;
    this.passwordHash = user.passwordHash;
    this.displayName = user.displayName;
    this.email = user.email;
    this.role = user.role;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this; //возвращаем this что бы был паттерн билдер, что бы мы могли чейнить: .user .setPassword .еще что-то
  }

  public validatePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}

// мы в Энити запихали установку и валидацию пароля, и такой подход к ентити потом будет удобен для развития проекта
