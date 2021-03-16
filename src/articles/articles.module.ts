import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticleSchema} from './articles.model';

@Module({

    imports: [
        MongooseModule.forFeature([{name: 'Article', schema: ArticleSchema}])
    ],

    controllers: [
        ArticlesController
    ],

    providers: [
        ArticlesService
    ]
})

    export class ArticlesModule {}
