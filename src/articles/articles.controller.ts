import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { Article } from './articles.model'

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    // CREATE REQ @GET LIST ALL ARTICLES 
    // @Get()
    // async getAllArticles() {
    //     const articles = await this.articlesService.getArticles();
    //     return articles;
    // }

    // CREATE REQ @GET(PARAM:CATEGORY) LIST ONLY ARTICLE BY CATEGORY SEARCH
    @Get()
     getArticles(@Query('category') category: string,@Query('title') title: string){
        const articles =  this.articlesService.filterByCategory(category)
        console.log('category', articles)
        return [category, title];
    }
    
    // @Get()
    // getArticles(@Query('title') title: string){
    //     const articles = this.articlesService.filterByTitle(title);
    //     console.log('title', articles)
    //     return [title]
    // }

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

function category(category: any, string: any) {
    throw new Error('Function not implemented.');
}

function filterByCategory(category: string) {
    throw new Error('Function not implemented.');
}

