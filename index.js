import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { listResources } from './src/listResources.js';

// Read package.json
const packageJsonPath = path.resolve('package.json');
const { version } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Function to display help information
const displayHelp = () => {
    console.log('Usage:');
    console.log('  cloud-resource-logger list --service <service>');
    console.log('');
    console.log('Available Services:');
    console.log('  ec2       - List all EC2 instances');
    console.log('  s3        - List all S3 buckets');
    console.log('  lambda    - List all Lambda functions');
    console.log('  dynamodb  - List all DynamoDB tables');
    console.log('');
    console.log('Commands:');
    console.log('  help      - Show this help message');
};

// Create a new Commander program instance
const program = new Command();

program
    .name('cloud-resource-logger')
    .description('CLI for listing AWS resources')
    .version(version); // Use version from package.json

// Define the 'list' command
program
    .command('list')
    .description('List AWS resources')
    .option('--service <service>', 'AWS service to list (e.g., ec2, s3, lambda, dynamodb)')
    .action(async (options) => {
        const { service } = options;
        if (!service) {
            console.log('Please provide a service using --service');
            return;
        }
        await listResources(service);
    });

// Define the 'help' command
program
    .command('help')
    .description('Show help message')
    .action(() => {
        displayHelp();
    });

// Define the 'version' command
program
    .command('version')
    .description('Show version number')
    .action(() => {
        console.log(version);
    });

// Parse command-line arguments
program.parse(process.argv);
