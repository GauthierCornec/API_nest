import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt'

// récupère un user et vérifie le mdp 
// la plus part du travail de validation est effectué ici

@Injectable()
export class AuthService {
    constructor (
        private userService: UsersService,
        private jwtService: JwtService
        ) {}

     async validateUser (username: string, pass: string, admin: string): Promise<any> { // validateUser à pour mission de récupérer un User et vérifier mdp
         const user = await this.userService.findOne(username);
         if (user && user.password === pass, admin) {
             const {password, ...result} = user;
             return result; 
         }

         return null; 
     }

     async login (user: any) {
         const playload = {username: user.username, sub: user.userId, admin: user.admin};
         return{
             access_token: this.jwtService.sign(playload),
         };
     }
}
