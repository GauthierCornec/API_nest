import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ArticlesModule,
    MongooseModule.forRoot('mongodb+srv://Gauthier:Car3dinal@cluster0.9a3kd.mongodb.net/db_articles?retryWrites=true&w=majority')
  ],

  controllers: [
    AppController, 
  ],

  providers: [
    AppService, 
  ],

})
export class AppModule {}
