import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PositionsService {
    constructor(private prisma: PrismaService) {}
    async findAll() {
        const positions = await this.prisma.position.findMany();
        if (positions.length < 1) {
            throw new NotFoundException({ success: false, message: 'Positions not found' });
        }
        return positions;
    }
}
