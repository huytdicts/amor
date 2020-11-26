import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenHelper {
  constructor(private configService: ConfigService) {}

  private jwtsecret =
    this.configService.get<string>('JWT_SECRET') || 'sEcurE_pAss';
  private jwtExpriresInSec =
    this.configService.get<number>('JWT_EXPSEC') || 3000;

  async generate(
    payload: Record<string, any>,
    secret: string = this.jwtsecret,
    expiresIn: number = this.jwtExpriresInSec,
  ): Promise<{
    token: string;
  }> {
    const token = await jwt.sign(payload, secret, {
      expiresIn: expiresIn,
    });
    return {
      token: token,
    };
  }

  async verify<T>(token: string): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.verify(token, this.jwtsecret);
        resolve(payload as any);
      } catch (error) {
        reject(error);
      }
    });
  }
}
