import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api/v1');
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory(errors) {
                const validationErrors = errors.map((error) => error.constraints);
                const validationProperties = errors.map((error) => error.property);
                const fails = validationErrors.map((error, index) => {
                    const message = Object.values(error || {})[0];
                    const errorProperty = validationProperties[index] || 'error';
                    return { [errorProperty]: message };
                });
                return new BadRequestException({
                    success: false,
                    message: 'Validation failed',
                    fails: fails,
                });
            },
        }),
    );
    await app.listen(process.env.PORT || 5000);
}
void bootstrap();
