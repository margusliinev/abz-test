import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'If you see this then server and client are connected correctly!';
    }
}
