import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import { exception } from 'console';


@Injectable()
export class ImageManagerService {
    bucket = new S3({
            accessKeyId: 'AKIA5QW2NI33TYB3KSPV',
            secretAccessKey: '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',
            region: 'us-east-1'
        }
    );
    params = {
        Bucket: 'jazz-lines',
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