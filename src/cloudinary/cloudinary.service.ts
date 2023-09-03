import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import cloudinary from 'cloudinary';
import Jimp from 'jimp';

@Injectable()
export class CloudinaryService {
    async uploadPhoto(file: Express.Multer.File): Promise<string> {
        const image = await Jimp.read(file.path);
        if (image.getWidth() < 70 || image.getHeight() < 70) {
            throw new BadRequestException({
                success: false,
                message: 'Validation Failed.',
                fails: { photo: 'Photo must be at least 70x70 pixels.' },
            });
        }

        const response = await cloudinary.v2.uploader.upload(file.path, {
            transformation: [{ width: 70, height: 70, crop: 'fit', quality: 'auto' }],
        });
        if (!response) {
            throw new InternalServerErrorException('Error uploading photo');
        }
        return response.secure_url;
    }
}
