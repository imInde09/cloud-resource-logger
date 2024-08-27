#!/usr/bin/env node

const { Command } = require('commander');
const { listResources } = require('./src/listResources');
const program = new Command();

program
    .name('cloud-resource-logger')
    .description('CLI to log active AWS resources')
    .version('1.0.0');

program
    .command('list')
    .description('List active AWS resources')
    .option('-s, --service <type>', 'Specify AWS service (ec2, s3)')
    .action((options) => {
        listResources(options.service);
    });

program.parse(process.argv);
