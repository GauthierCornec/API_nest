import * as mongoose from 'mongoose';
import { Role } from '../role/role.enums';

export const UsersSchema = new mongoose.Schema({
    id: {type: String, require: true},
    user: {type: Int32Array, require:true},
    password:{type: String, require: true},
    

});

export interface User extends mongoose.Document{
    id: string,
    user: Int32Array,
    password: string,

}