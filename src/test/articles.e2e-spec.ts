import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ArticlesModule } from '../articles/articles.module';
import { ArticlesService } from '../articles/articles.service';
import { INestApplication } from '@nestjs/common';

// var expect = require('chai').expect;


describe ('Articles', () => {
    let app : INestApplication;
    let articlesService = { findAll: () => ['test']};

    beforeAll (async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ArticlesModule],
        })
        .overrideProvider(ArticlesService)
        .useValue(articlesService)
        .compile()

    app = moduleRef.createNestApplication();
    await app.init();
    });

    it ('/GET Articles', () =>{
        return request(app.getHttpServer())
        .get('/articles')
        .expect(200)
        .expect({
            data : articlesService.findAll(),
        });
    });

    afterAll (async () => {
        await app.close();
    });
});