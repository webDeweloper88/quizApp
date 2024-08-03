import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('secret_jwt'),
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload); // Добавьте этот вывод для диагностики
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
