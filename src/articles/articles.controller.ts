import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { createGunzip } from 'node:zlib';
import { async } from 'rxjs';

import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    // CREATE REQ @GET LIST ALL ARTICLES 
    @Get()
    async getAllArticles() {
        const articles = await this.articlesService.getArticles();
        return articles;
    }

    // CREATE REQ @GET(PARAM:CATEGORY) LIST ONLY CATEGORY 
    @Get(':category')
    getArticles(@Param('category') artCategory: string){
        return this.articlesService.getArticlesByCategory(artCategory);
    }

    // CREATE REQ @GET(PARAM: ID) LIST PRODUCT N°ID
    // @Get(':id')
    // getArticles(@Param('id') artId: string){
    //     return this.articlesService.getSingleArticleById(artId)
    // }

    // CREATE REQ @POST 
    @Post()
    async addArticle(
        @Body('title') artTitle: string,
        @Body('description') artDescription: string,
        @Body('url') artUrl: string,
        @Body('cover') artCover: string,
        @Body('content') artContent: string,
        @Body('category') artCategory: string,
    ){
        const generatedId = await  this.articlesService.insertArticle(
            artTitle,
            artDescription,
            artUrl,
            artCover,
            artContent,
            artCategory
        );
        return { id: generatedId };
      }

    // CREATE REQ @PATCH : MODIFY 
    @Patch(':id')
    async updateArticle(
        @Param('id') artId: string,
        @Body('title') artTitle: string,
        @Body('description') artDescription: string,
        @Body('url') artUrl: string,
        @Body('cover') artCover: string,
        @Body('content') artContent: string,
        @Body('category') artCategory: string
    ){
        await this.articlesService.updateArticle(artId, artTitle, artDescription, artUrl, artCover, artContent, artCategory)
        return null;
    }

    // @Delete(':id)')
    // async removeArticle(@Param('id') artId: string){
    //     this.articlesService.deleteArticle(artId);
    //     return null;
    // }

    
    

}

