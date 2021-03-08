import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { AppConfig } from '../app.config';

@Injectable()
export class ImageManagerService {
    bucket = new S3({
            accessKeyId: AppConfig.settings.s3.accessKeyId,
            secretAccessKey: AppConfig.settings.s3.secretAccessKey,
            region: AppConfig.settings.s3.region
        }
    );
    params = {
        Bucket:  AppConfig.settings.s3.bucket,
        Key: '',
        Body: null,
        ACL: 'public-read',
        ContentType: null
    };

    uploadFile(file, folderName, fileName): any {
        this.params.ContentType = file.type;
        this.params.Key = folderName + '/' + fileName;
        this.params.Body = file;
        return new Promise((resolve, reject) => {
            this.bucket.upload(this.params, function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    
}