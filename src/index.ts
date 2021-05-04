import { error } from "console";
import "reflect-metadata";
import {Connection, createConnection, Entity, getConnectionManager, getManager, getMongoManager, getMongoRepository, ManyToMany, ObjectID} from "typeorm";
import {Article} from "./entity/Articles";




createConnection().then(async connection => {

    console.log("sucessfull connection");

    // const article = new Article();
    // article._id;
    // article.title;
    // article.description;
    // article.url;
    // article.cover;
    // article.content;
    // article.category;

    // console.log("article créé et sauvegardé")
    // await connection.manager.save(article);

    // let articles = await connection.manager.find(Article);
    // console.log("Full data from DB" + articles);


    const manager = getMongoManager();
    const articleRepository = connection.getMongoRepository(Article);

    // PRINT ALL ARTICLES
    const allArticles = await articleRepository.findAndCount();
    console.log("Liste de tous les articles", allArticles);

    // PRINT ARTICLES FROM CATEGORY
    const category = await manager.findAndCount(Article, {category: 'mobilier'}); // ouput every articles witch is in category "mobilier"
    console.log("Liste des articles de la catégorie", category);


    // PRINT ARTICLES WITH LETTER ON INSIDE TITLE
    const title = await manager.findAndCount(Article,{where:{title:{$regex:"on"}}}) // output every article witch has letter on 
    console.log("Liste des article ayant dans le titre un C", title);

    // PRINT ARTICLES BY IDS
    // const findById = await manager.findByIds(Article,[]); none output even whit index
    // console.log("Article trouvé par ID ", findById);
    // const findbyId = await manager.(Article, {id: [1]});
    // console.log('find by id', findbyId);

    // FIND ARTICLE AND DELETE
    const deleteArticle = await manager.delete(Article,{title:"Chaise"})
    console.log('delete', deleteArticle)
    

    // CONNECTION API NBA

}).catch(error => console.log(error));


 
// createConnection().then(async connection => {

//     console.log("connection to NBA API")
//     const secondaryConnection = getConnectionManager().get("NBA");
//     const NBA = connection.getMongoRepository(NBAPlayers);

//     const allPlayers = await NBA.findAndCount();
//     console.log("NBA players", allPlayers);

// }).catch(error => console.log(error));

