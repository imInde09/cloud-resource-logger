import readline from 'readline';
import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';
import { LambdaClient, ListFunctionsCommand } from '@aws-sdk/client-lambda'; // Added LambdaClient
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb'; // Added DynamoDBClient

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const promptForCredentials = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter AWS Access Key ID: ', (accessKeyId) => {
            rl.question('Enter AWS Secret Access Key: ', (secretAccessKey) => {
                rl.question('Enter AWS Region: ', (region) => {
                    rl.close();
                    resolve({
                        accessKeyId,
                        secretAccessKey,
                        region
                    });
                });
            });
        });
    });
};

const listResources = async (service) => {
    try {
        const { accessKeyId, secretAccessKey, region } = await promptForCredentials();
        switch (service.toLowerCase()) {
            case 'ec2':
                await listEC2Instances(accessKeyId, secretAccessKey, region);
                break;
            case 's3':
                await listS3Buckets(accessKeyId, secretAccessKey, region);
                break;
            case 'lambda':
                await listLambdaFunctions(accessKeyId, secretAccessKey, region);
                break;
            case 'dynamodb':
                await listDynamoDBTables(accessKeyId, secretAccessKey, region);
                break;
            default:
                console.log('Service not supported. Please choose "ec2", "s3", "lambda", or "dynamodb".');
        }
    } catch (err) {
        console.error('Error fetching resources:', err);
    }
};

const listEC2Instances = async (accessKeyId, secretAccessKey, region) => {
    const ec2Client = new EC2Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
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

const listS3Buckets = async (accessKeyId, secretAccessKey, region) => {
    const s3Client = new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);

    const buckets = response.Buckets.map(bucket => bucket.Name);
    console.log('S3 Buckets:', buckets);
};

const listLambdaFunctions = async (accessKeyId, secretAccessKey, region) => {
    const lambdaClient = new LambdaClient({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });
    const command = new ListFunctionsCommand({});
    const response = await lambdaClient.send(command);

    const functions = response.Functions.map(fn => fn.FunctionName);
    console.log('Lambda Functions:', functions);
};

const listDynamoDBTables = async (accessKeyId, secretAccessKey, region) => {
    const dynamoClient = new DynamoDBClient({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });
    const command = new ListTablesCommand({});
    const response = await dynamoClient.send(command);

    const tables = response.TableNames;
    console.log('DynamoDB Tables:', tables);
};

export { listResources };
