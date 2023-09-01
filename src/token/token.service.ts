import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}
    private generateRandomString(length: number): string {
        const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
        return randomBytes.toString('hex').slice(0, length);
    }

    async getToken() {
        const payload = { sub: this.generateRandomString(10) };
        const token: string = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: 2400 });
        return token;
    }
}
