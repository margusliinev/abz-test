import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private cloudinary: CloudinaryService) {}
    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: createUserDto.email }, { phone: createUserDto.phone }],
            },
        });

        if (existingUser) {
            throw new ConflictException({ success: false, message: 'User with this phone or email already exist' });
        }

        const url = await this.cloudinary.uploadPhoto(createUserDto.photo);
        const newUser = await this.prisma.user.create({ data: { ...createUserDto, position_id: Number(createUserDto.position_id), photo: url } });

        if (!newUser) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to create new user' });
        }

        return newUser;
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }
}
