import { Injectable, InternalServerErrorException } from '@nestjs/common';
import cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryService {
    async uploadPhoto(file: Express.Multer.File): Promise<string> {
        const response = await cloudinary.v2.uploader.upload(file.path, {
            transformation: [{ width: 70, height: 70, crop: 'fit', quality: 'auto' }],
        });
        if (!response) {
            throw new InternalServerErrorException('Error uploading photo');
        }
        return response.secure_url;
    }
}
