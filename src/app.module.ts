import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PositionsModule } from './positions/positions.module';
import { PrismaModule } from './prisma/prisma.module';
import { TokenModule } from './token/token.module';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client', 'dist'),
        }),
        MulterModule,
        PositionsModule,
        PrismaModule,
        TokenModule,
        UsersModule,
        CloudinaryModule,
        NestjsFormDataModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
