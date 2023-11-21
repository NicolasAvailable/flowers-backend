import { Injectable } from '@nestjs/common';
import { cloudinaryResponse } from '../helpers/cloudinary.helper';

import {v2 as cloudinary} from 'cloudinary';

@Injectable()
export class CloudinaryService {

    constructor(){}
    
    public async uploadFile(base64Image: string): Promise<cloudinaryResponse> {
        return new Promise((resolve, reject) => {
            try {      
                const upload = cloudinary.uploader.upload(base64Image, {
                    folder: 'flowers',
                    resource_type: 'image'
                });
                resolve(upload)
            } catch (error) {
                reject(error)
            }
        });
    }
}
