import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersGuard } from './users.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { ParseIntPipe } from '@nestjs/common';

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
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: string) {
        const user = await this.usersService.findOne(+id);
        return { success: true, user: user };
    }
}
