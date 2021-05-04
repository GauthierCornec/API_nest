import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ // initialisation en passant un objet dans l'option super()
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // jwtFromrequest : fournit la méthode par laquelle le JWT sera extrait du fichier Request / approche standard : founiture d'un jeton
      ignoreExpiration: false, // délègue la responsabilité de s'assurer qu'un JWT n'a pas expiré au module Passport
      secretOrKey: jwtConstants.secret, // nous utilisons l'option opportune de fournir un secret symétrique pour signer le jeton
    });
  }

  async validate(payload: any) { // 
    return { userId: payload.sub, username: payload.username, password: payload.password,  roles: payload.roles};
  }
}
