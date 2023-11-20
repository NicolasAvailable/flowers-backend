import { Injectable } from '@nestjs/common';
import { cloudinaryResponse } from '../helpers/cloudinary.helper';

import {v2 as cloudinary} from 'cloudinary';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
    
    uploadFile(file: Express.Multer.File): Promise<cloudinaryResponse>{
        return new Promise<cloudinaryResponse>((resolve, rejects) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if(error) return rejects(error);

                    resolve(result);
                }
            );
            
            streamifier.createReadStream(file.buffer).pipe(uploadStream)
        })
    }
}
