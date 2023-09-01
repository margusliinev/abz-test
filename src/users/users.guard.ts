import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';

type Payload = {
    sub: string;
};

@Injectable()
export class UsersGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector, private prisma: PrismaService) {}

    private verifyToken(token: string): Payload {
        try {
            return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        } catch (error) {
            throw new UnauthorizedException({ success: false, message: 'The token is invalid.' });
        }
    }

    private extractToken(request: Request) {
        const authHeader = request.headers.authorization;
        return authHeader ? authHeader.split(' ')[1] : null;
    }

    private async getTokenFromDatabase(token: string) {
        return await this.prisma.token.findUnique({ where: { token } });
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);

        if (!token) {
            throw new UnauthorizedException({ success: false, message: 'The token is missing.' });
        }

        this.verifyToken(token);
        const dbToken = await this.getTokenFromDatabase(token);

        if (!dbToken) {
            throw new UnauthorizedException({ success: false, message: 'The token expired.' });
        }

        await this.prisma.token.delete({ where: { token } });
        return true;
    }
}
