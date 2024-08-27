require('dotenv').config();
const { EC2Client, DescribeInstancesCommand } = require('@aws-sdk/client-ec2');
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');

const listResources = async (service) => {
    try {
        switch (service.toLowerCase()) {
            case 'ec2':
                await listEC2Instances();
                break;
            case 's3':
                await listS3Buckets();
                break;
            default:
                console.log('Service not supported. Please choose "ec2" or "s3".');
        }
    } catch (err) {
        console.error('Error fetching resources:', err);
    }
};

const listEC2Instances = async () => {
    const ec2Client = new EC2Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
    const command = new DescribeInstancesCommand({});
    const response = await ec2Client.send(command);

    const instances = response.Reservations.flatMap(reservation =>
        reservation.Instances.map(instance => ({
            InstanceId: instance.InstanceId,
            State: instance.State.Name,
        }))
    );

    console.log('Active EC2 Instances:', instances);
};

const listS3Buckets = async () => {
    const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);

    const buckets = response.Buckets.map(bucket => bucket.Name);
    console.log('S3 Buckets:', buckets);
};

module.exports = { listResources };
