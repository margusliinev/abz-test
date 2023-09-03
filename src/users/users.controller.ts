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
    @FormDataRequest({ storage: FileSystemStoredFile, fileSystemStoragePath: './uploads' })
    async create(@Body() createUserDto: CreateUserDto) {
        const newUser = await this.usersService.create(createUserDto);
        return { success: true, user_id: newUser.id, message: 'New user successfully registered' };
    }

    @Get()
    async findAll(@Query('page') page: number, @Query('offset') offset: number, @Query('count') count: number) {
        if (page < 1) {
            throw new BadRequestException({ success: false, message: 'Validation failed', fails: { page: 'The page must be at least 1.' } });
        }

        if (!page) page = 1;
        if (!count) count = 5;

        const { currentPage, total_pages, total_users, currentCount, links, users } = await this.usersService.findAll(+page, +offset, +count);

        return {
            success: true,
            page: currentPage,
            total_pages,
            total_users,
            count: currentCount,
            links: links,
            users: users,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(+id);
        return { success: true, user: user };
    }
}
