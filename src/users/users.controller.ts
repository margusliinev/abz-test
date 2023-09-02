import { Controller, Get, Post, Body, Param, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { UsersGuard } from './users.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(UsersGuard)
    @Post()
    @FormDataRequest({ storage: FileSystemStoredFile })
    async create(@Body() createUserDto: CreateUserDto) {
        const newUser = await this.usersService.create(createUserDto);
        return { success: true, user_id: newUser.id, message: 'New user successfully registered' };
    }

    @Get()
    async findAll(@Query('page') page: number, @Query('offset') offset: number, @Query('count') count: number) {
        if (page < 1) {
            throw new BadRequestException({ success: false, message: 'Validation failed', fails: { page: 'The page must be at least 1.' } });
        }

        const { currentPage, total_pages, total_users, currentCount, users } = await this.usersService.findAll(+page, +offset, +count);
        const nextPage = +page + 1;
        const prevPage = +page - 1;
        const baseUrl =
            process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/v1/users' : 'https://abz-test.up.railway.app/api/v1/users';
        let next_url: string | null = `${baseUrl}?page=${nextPage}&count=${count}`;
        let prev_url: string | null = `${baseUrl}?page=${prevPage}&count=${count}`;
        if (nextPage > total_pages) {
            next_url = null;
        }
        if (prevPage < 1 || prevPage > total_pages) {
            prev_url = null;
        }

        return {
            success: true,
            page: currentPage,
            total_pages,
            total_users,
            count: currentCount,
            links: { next_url, prev_url },
            users: users,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(+id);
        return { success: true, user: user };
    }
}
