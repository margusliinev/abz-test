import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService, private prisma: PrismaService) {}
    private generateRandomString(length: number): string {
        const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
        return randomBytes.toString('hex').slice(0, length);
    }

    async getToken() {
        const payload = { sub: this.generateRandomString(10) };
        const token: string = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: 2400 });

        const newToken = await this.prisma.token.create({ data: { token: token } });
        if (!newToken) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to create a token' });
        }

        return token;
    }
}
