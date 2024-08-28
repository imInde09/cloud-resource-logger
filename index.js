#!/usr/bin/env node

const { Command } = require('commander');
const { listResources } = require('./src/listResources');

// Function to display help information
const displayHelp = () => {
    console.log('Usage:');
    console.log('  cloud-resource-logger list --service <service>');
    console.log('');
    console.log('Available Services:');
    console.log('  ec2      - List all EC2 instances');
    console.log('  s3       - List all S3 buckets');
    console.log('');
    console.log('Commands:');
    console.log('  help     - Show this help message');
};

// Create a new Commander program instance
const program = new Command();

program
    .name('cloud-resource-logger')
    .description('CLI for listing AWS resources')
    .version('1.0.0');

// Define the 'list' command
program
    .command('list')
    .description('List AWS resources')
    .option('--service <service>', 'Specify the AWS service (ec2, s3)')
    .action(async (options) => {
        if (options.service) {
            await listResources(options.service);
        } else {
            console.log('Please specify a service using --service option.');
            displayHelp();
        }
    });

// Define the 'help' command
program
    .command('help')
    .description('Show help message')
    .action(() => {
        displayHelp();
    });

// Parse command-line arguments
program.parse(process.argv);
