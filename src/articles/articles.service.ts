import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { model, Model, Query } from 'mongoose';


import { Article, ArticleSchema } from './articles.model'

@Injectable()
export class ArticlesService {
    private articles : Article[] = [];

    constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) {}

    async getArticles() { // function qui permet d'afficher l'esemble de la DB
        const articles = await this.articleModel.find().exec();
        return articles.map((art) => ({id: art.id, title: art.title, description: art.description, url: art.url, cover: art.cover, content: art.content, category: art.category }));
    }

    // async getArticlesByCategory(category): Promise<Article[]> { // function qui permet d'afficher les articles selon leurs catégories.
    //     const articles = await this.articleModel.find({category});
    //     console.log("article", articles);
    //     return

    // }

    async filterByCategory(category: string): Promise<Article[]>{
        const articles = await this.articleModel.find({}).where('category').equals(category).lean();
        console.log('articles', articles);
        return articles[category];
    }

    async filterByTitle(title: string): Promise<Article[]>{
        const articles = await this.articleModel.find({}).where('title').equals(title).lean();
        console.log(articles);
        return articles[title];
    }

    async filterByLetter(letter: string): Promise<Article[]>{
        const articles = await (await this.articleModel.find()).includes
        console.log(articles)
        return
    }

    // private async findArticlesByCategory(category: string): Promise<Article[]> { 
    //     let article
    //     console.log(this.articleModel);
    //     try{
    //         article = await this.articleModel.find([category]);
    //         return article

    //     }catch(error){
    //         console.log(article);
    //         throw new NotFoundException('La catégorie n' +'a pas été trouvé');
    //     }
       
    // }

    async getSingleArticleById(articleId: string){
        const article = await this.findArticleById(articleId);
        console.log('articles', article);
        return {id: article.id, title: article.title, description: article.description, url: article.url, cover: article.cover, content: article.content, category: article.category};
    }
    private async findArticleById (id: string): Promise<Article> {
        let article;
        console.log(this.articleModel);
        try{
            article = await this.articleModel.findById(id);
            console.log(article);
            return article
        }catch(error){
            throw new NotFoundException ('Le produit n'+'a pas été trouvé selon l'+' ID');
        }
        
    }

    async insertArticle (title: string, description: string, url: string, cover: string, content:string, category: string){
        const newArticle = new this.articleModel({title, description, url, cover, content, category});
        const result = await newArticle.save();
        console.log(result);
        return result.id as string;
    }
    async updateArticle ( id: string, title: string, description: string, url: string, cover: string, content: string, category: string){
        const updateArticle = await this.findArticleById(id);
        
        if(title){
            updateArticle.title = title;
        }
        if(description){
            updateArticle.description = description;
        }
        if(url){
            updateArticle.url = url;
        }
        if(cover){
            updateArticle.cover = cover;
        }
        if(content){
            updateArticle.content = content;
        }

        updateArticle.save();
        
    }

    // deleteArticle (artId: string){
    //     const index = this.findArticleById(artId)[1];
    //     console.log(index);
    //     this.articles.splice(index, 1);
        
    // }



    
    

    

}
