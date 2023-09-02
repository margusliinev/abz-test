import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

    async findAll(page: number, offset: number, count: number) {
        const skip = (page - 1) * count;
        const users = await this.prisma.user.findMany({
            skip: offset ? offset : skip,
            take: count,
            include: { position: { select: { name: true } } },
            orderBy: { registration_timestamp: 'desc' },
        });

        const totalUsers = await this.prisma.user.count();

        const formattedUsers = users.map((user) => {
            const registrationTimestampUnix = user.registration_timestamp ? Math.floor(new Date(user.registration_timestamp).getTime() / 1000) : null;

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                position: user.position.name,
                position_id: user.position_id,
                registration_timestamp: registrationTimestampUnix,
                photo: user.photo,
            };
        });

        const totalPages = Math.ceil(totalUsers / count);

        return {
            currentPage: page,
            total_pages: totalPages,
            total_users: totalUsers,
            currentCount: count,
            users: formattedUsers,
        };
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: id },
            include: {
                position: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (!user) {
            throw new NotFoundException({
                success: false,
                message: 'The user with the requested identifier does not exist',
                fails: { user_id: 'User not found' },
            });
        }
        const formattedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            position: user.position.name,
            position_id: user.position_id,
            photo: user.photo,
        };

        return formattedUser;
    }
}
