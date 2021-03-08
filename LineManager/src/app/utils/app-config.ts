export interface IAppConfig {
    env: string,
    serverUrl: string;
    s3: {
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
        bucket: string;
    }

}