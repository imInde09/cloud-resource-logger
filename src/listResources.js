import readline from 'readline';
import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';
import { LambdaClient, ListFunctionsCommand } from '@aws-sdk/client-lambda';
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import fs from 'fs';
import path from 'path';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const configPath = path.resolve('config.json');

// Save AWS credentials to config.json
const saveCredentials = (credentials) => {
    fs.writeFileSync(configPath, JSON.stringify(credentials));
};

// Load AWS credentials from config.json
const loadCredentials = () => {
    if (fs.existsSync(configPath)) {
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    return null;
};

// Delete config.json to stop environment
const clearCredentials = () => {
    if (fs.existsSync(configPath)) {
        fs.unlinkSync(configPath);
    }
};

// Prompt user for AWS credentials and region
const promptForCredentials = () => {
    return new Promise((resolve) => {
        rl.question('Enter AWS Access Key ID: ', (accessKeyId) => {
            rl.question('Enter AWS Secret Access Key: ', (secretAccessKey) => {
                rl.question('Enter AWS Region: ', (region) => {
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

// Ensure readline is closed after each command
const closeReadline = () => {
    rl.close();
};

// List resources based on the selected AWS service
const listResources = async (service) => {
    try {
        let credentials = loadCredentials();
        if (!credentials) {
            credentials = await promptForCredentials();
            saveCredentials(credentials);
        }
        const { accessKeyId, secretAccessKey, region } = credentials;
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
    } finally {
        // Always close readline interface after completing the action
        closeReadline();
    }
};

// List EC2 instances
const listEC2Instances = async (accessKeyId, secretAccessKey, region) => {
    const ec2Client = new EC2Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    });
    const command = new DescribeInstancesCommand({});
    const response = await ec2Client.send(command);

    const instances = response.Reservations.flatMap(reservation =>
        reservation.Instances.map(instance => ({
            InstanceId: instance.InstanceId,
            State: instance.State.Name
        }))
    );

    console.log('Active EC2 Instances:', instances);
};

// List S3 buckets
const listS3Buckets = async (accessKeyId, secretAccessKey, region) => {
    const s3Client = new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    });
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);

    const buckets = response.Buckets.map(bucket => bucket.Name);
    console.log('S3 Buckets:', buckets);
};

// List Lambda functions
const listLambdaFunctions = async (accessKeyId, secretAccessKey, region) => {
    const lambdaClient = new LambdaClient({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    });
    const command = new ListFunctionsCommand({});
    const response = await lambdaClient.send(command);

    const functions = response.Functions.map(fn => fn.FunctionName);
    console.log('Lambda Functions:', functions);
};

// List DynamoDB tables
const listDynamoDBTables = async (accessKeyId, secretAccessKey, region) => {
    const dynamoClient = new DynamoDBClient({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    });
    const command = new ListTablesCommand({});
    const response = await dynamoClient.send(command);

    const tables = response.TableNames;
    console.log('DynamoDB Tables:', tables);
};

// Export necessary functions
export { listResources, clearCredentials };
