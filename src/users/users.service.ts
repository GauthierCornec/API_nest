import { Injectable } from '@nestjs/common';
import { Role } from '../role/role.enums';



// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'gauthier',
      password: 'cornec',
      roles: Role['admin'],

    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: Role['admin'],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}