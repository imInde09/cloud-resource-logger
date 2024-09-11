import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

const listS3Buckets = async (accessKeyId, secretAccessKey, region) => {
    const s3Client = new S3Client({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);

    const buckets = response.Buckets.map(bucket => bucket.Name);
    console.log('S3 Buckets:', buckets);
};

export { listS3Buckets };
