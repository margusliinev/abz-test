import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

type Payload = {
    sub: string;
};

@Injectable()
export class UsersGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException({ success: false, message: 'The token is missing.' });
        }

        try {
            this.jwtService.verify<Payload>(token, { secret: process.env.JWT_SECRET });
        } catch (error) {
            throw new UnauthorizedException({ success: false, message: 'The token expired.' });
        }
        return true;
    }
}
