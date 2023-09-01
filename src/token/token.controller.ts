import { Controller, Get, Res } from '@nestjs/common';
import { TokenService } from './token.service';
import { Response } from 'express';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Get()
    async getToken(@Res() res: Response) {
        const token = await this.tokenService.getToken();
        res.header('Authorization', `Bearer ${token}`);
        res.status(200).json({ success: true, token: token });
    }
}
