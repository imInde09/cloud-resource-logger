#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { listResources } from './src/listResources.js';
import { startEnvironment, stopEnvironment } from './src/environmentManager.js'; // New import

// Read package.json
const packageJsonPath = path.resolve('package.json');
const { version } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

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

// Define the 'start' command
program
    .command('start')
    .description('Start environment and save AWS credentials')
    .action(async () => {
        await startEnvironment(); // Call the function to start the environment
    });

// Define the 'stop' command
program
    .command('stop')
    .description('Stop environment and delete saved AWS credentials')
    .action(() => {
        stopEnvironment(); // Call the function to stop the environment
    });

// Define the 'help' command
program
    .command('help')
    .description('Show help message')
    .action(() => {
        console.log('Usage:');
        console.log('  cloud-resource-logger list --service <service>');
        console.log('  cloud-resource-logger start');
        console.log('  cloud-resource-logger stop');
    });

// Parse command-line arguments
program.parse(process.argv);
