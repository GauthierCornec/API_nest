import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

// import { hasRole } from '../role/roles.guards'
import { ArticlesService } from './articles.service';
import { Article } from './articles.model'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../role/role.enums';
import { Roles } from '../role/roles.decorator';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    // CREATE REQ @GET LIST ALL ARTICLES 
    @Get()
    async getAllArticles() {
        console.log('ensemble des artciles');
        const articles = await this.articlesService.getArticles();
        return articles;
    }

    // CREATE REQ @GET(PARAM: ID) LIST PRODUCT N°ID
    @Get('/id:id')
    getArticles(@Param('id') artId: string){
        console.log('article selon id')
        return this.articlesService.getSingleArticleById(artId)
    }

    // CREATE REQ @GET(PARAM:SEARCH CT) 
    @Get('/searchCT')
    getArticles1(@Query('category') category: string, @Query('title') title: string ){
        const articlesC =  this.articlesService.filterByCategory(category);
        const articlesT = this.articlesService.filterByTitle(title);
        console.log('category', articlesC, articlesT);
        return [category, title];
    }

    @Get('/search')
    getArticles2(@Query('search') letters:string){
        const articles = this.articlesService.filterByLetter(letters);
        console.log('lettre', [articles]);
        return ;
    }

    // CREATE REQ @POST 
    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
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
   
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
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
    //     await this.articlesService.deleteArticle(artId);
    //     return null;
    // }
}


