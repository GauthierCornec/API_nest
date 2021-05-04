import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersService } from './users.service';


@Module({
  providers: [
    UsersService,
  
  ], 
  exports: [UsersService],
})
export class UsersModule {}
