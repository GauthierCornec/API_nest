import * as mongoose from 'mongoose';
// import { Document} from 'mongoose'; 

export const ArticleSchema = new mongoose.Schema({ // Schema mapé à une collection MongoDB et définit la forme des documents au sein de la collection
  id: {type: String, require: true},
  title: {type: String, require: true },
  description: {type: String, require: true},
  url: {type: String, require: true},
  cover: {type: String, require: true},
  content: {type: String, require: true},
  category: {type: String, require: true},

})

export interface Article extends mongoose.Document {
     id: string,
     title: string,
     description: string,
     url: string,
     cover: string,
     content: string,
     category: string,

}


