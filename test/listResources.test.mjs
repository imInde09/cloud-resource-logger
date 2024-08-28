import { expect } from 'chai';
import sinon from 'sinon';
import readline from 'readline';
import { listResources } from '../src/listResources.js';
import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';
import { LambdaClient, ListFunctionsCommand } from '@aws-sdk/client-lambda';
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';

describe('listResources', () => {
    let promptStub, ec2Stub, s3Stub, lambdaStub, dynamoStub;

    beforeEach(() => {
        promptStub = sinon.stub(readline.Interface.prototype, 'question');
        ec2Stub = sinon.stub(EC2Client.prototype, 'send');
        s3Stub = sinon.stub(S3Client.prototype, 'send');
        lambdaStub = sinon.stub(LambdaClient.prototype, 'send');
        dynamoStub = sinon.stub(DynamoDBClient.prototype, 'send');
    });

    afterEach(() => {
        promptStub.restore();
        ec2Stub.restore();
        s3Stub.restore();
        lambdaStub.restore();
        dynamoStub.restore();
    });

    it('should list EC2 instances', async () => {
        promptStub.onCall(0).callsFake((question, callback) => callback('accessKeyId'));
        promptStub.onCall(1).callsFake((question, callback) => callback('secretAccessKey'));
        promptStub.onCall(2).callsFake((question, callback) => callback('region'));

        ec2Stub.resolves({
            Reservations: [{
                Instances: [{ InstanceId: 'i-1234567890abcdef0', State: { Name: 'running' } }]
            }]
        });

        const consoleLogStub = sinon.stub(console, 'log');
        
        await listResources('ec2');

        expect(consoleLogStub.calledWith('Active EC2 Instances:', [
            { InstanceId: 'i-1234567890abcdef0', State: 'running' }
        ])).to.be.true;

        consoleLogStub.restore();
    });

    it('should list S3 buckets', async () => {
        promptStub.onCall(0).callsFake((question, callback) => callback('accessKeyId'));
        promptStub.onCall(1).callsFake((question, callback) => callback('secretAccessKey'));
        promptStub.onCall(2).callsFake((question, callback) => callback('region'));

        s3Stub.resolves({
            Buckets: [{ Name: 'test-bucket' }]
        });

        const consoleLogStub = sinon.stub(console, 'log');
        
        await listResources('s3');

        expect(consoleLogStub.calledWith('S3 Buckets:', ['test-bucket'])).to.be.true;

        consoleLogStub.restore();
    });

    it('should list Lambda functions', async () => {
        promptStub.onCall(0).callsFake((question, callback) => callback('accessKeyId'));
        promptStub.onCall(1).callsFake((question, callback) => callback('secretAccessKey'));
        promptStub.onCall(2).callsFake((question, callback) => callback('region'));

        lambdaStub.resolves({
            Functions: [{ FunctionName: 'test-function' }]
        });

        const consoleLogStub = sinon.stub(console, 'log');
        
        await listResources('lambda');

        expect(consoleLogStub.calledWith('Lambda Functions:', ['test-function'])).to.be.true;

        consoleLogStub.restore();
    });

    it('should list DynamoDB tables', async () => {
        promptStub.onCall(0).callsFake((question, callback) => callback('accessKeyId'));
        promptStub.onCall(1).callsFake((question, callback) => callback('secretAccessKey'));
        promptStub.onCall(2).callsFake((question, callback) => callback('region'));

        dynamoStub.resolves({
            TableNames: ['test-table']
        });

        const consoleLogStub = sinon.stub(console, 'log');
        
        await listResources('dynamodb');

        expect(consoleLogStub.calledWith('DynamoDB Tables:', ['test-table'])).to.be.true;

        consoleLogStub.restore();
    });

    it('should show an error for unsupported service', async () => {
        promptStub.onCall(0).callsFake((question, callback) => callback('accessKeyId'));
        promptStub.onCall(1).callsFake((question, callback) => callback('secretAccessKey'));
        promptStub.onCall(2).callsFake((question, callback) => callback('region'));

        const consoleLogStub = sinon.stub(console, 'log');

        await listResources('unsupported-service');

        expect(consoleLogStub.calledWith('Service not supported. Please choose "ec2", "s3", "lambda", or "dynamodb".')).to.be.true;

        consoleLogStub.restore();
    });
});
