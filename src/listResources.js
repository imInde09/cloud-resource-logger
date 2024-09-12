import { listEC2Instances } from './resources/ec2.js';
import { listS3Buckets } from './resources/s3.js';
import { listLambdaFunctions } from './resources/lambda.js';
import { listDynamoDBTables } from './resources/dynamodb.js';
import { listRDSInstances } from './resources/rds.js'; 
import { listIAMUsers } from './resources/iam.js';     
import { listECSClusters } from './resources/ecs.js';  
import { listEKSClusters } from './resources/eks.js';  
import fs from 'fs';
import path from 'path';
import readline from 'readline';

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

// Prompt user for AWS credentials and region
const promptForCredentials = () => {
    return new Promise((resolve) => {
        rl.question('Enter AWS Access Key ID: ', (accessKeyId) => {
            rl.question('Enter AWS Secret Access Key: ', (secretAccessKey) => {
                rl.question('Enter AWS Region: ', (region) => {
                    resolve({ accessKeyId, secretAccessKey, region });
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
            case 'rds':
                await listRDSInstances(accessKeyId, secretAccessKey, region);
                break;
            case 'iam':
                await listIAMUsers(accessKeyId, secretAccessKey, region);
                break;
            case 'ecs':   
                await listECSClusters(accessKeyId, secretAccessKey, region);
                break;
            case 'eks':   
                await listEKSClusters(accessKeyId, secretAccessKey, region);
                break;    
            default:
                console.log('Service not supported. Please choose "ec2", "s3", "lambda", or "dynamodb".');
        }
    } catch (err) {
        console.error('Error fetching resources:', err);
    } finally {
        closeReadline();
    }
};

export { listResources };
