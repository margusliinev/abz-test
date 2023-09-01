import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
    imports: [JwtModule, CloudinaryModule, NestjsFormDataModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
