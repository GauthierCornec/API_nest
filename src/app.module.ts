import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import "reflect-metadata";

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CaslModule } from './casl/casl.module';
import { RolesGuard } from './role/roles.guards';

@Module({
  imports: [
    ArticlesModule,
    MongooseModule.forRoot('mongodb+srv://Gauthier:Car3dinal@cluster0.9a3kd.mongodb.net/db_articles?retryWrites=true&w=majority'),
    AuthModule,
    UsersModule,
    CaslModule,
  ],

  controllers: [
    AppController, 
  ],

  providers: [
    AppService, 
    {
    provide:APP_GUARD,
    useClass: RolesGuard
    }
  ],

})
export class AppModule {}
