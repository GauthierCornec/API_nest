import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// stratégie d'authentification en local 

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // constructor appel super sans objet d'option. Il prend user et password 
  }

  async validate(username: string, password: string, admin: string): Promise<any> { // méthode validate avec comme signature (username et password)
    const user = await this.authService.validateUser(username, password, admin);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}