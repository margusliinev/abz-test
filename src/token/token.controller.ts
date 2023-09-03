import { Controller, Get } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Get()
    async getToken() {
        const token = await this.tokenService.getToken();
        return { success: true, token: token };
    }
}
