import {ObjectIdColumn, Column, Entity} from "typeorm";

@Entity('articles')
export class Article {

    
    @ObjectIdColumn()
    _id: String;

    @Column('text')
    title: String;

    @Column('text')
    description: String;

    @Column('text')
    url: String;

    @Column('text')
    cover: string;

    @Column('text')
    content: String;

    @Column('text')
    category: String;
    
    constructor(init?: Partial<Article>) {
        Object.assign(this, init);
    }
}
