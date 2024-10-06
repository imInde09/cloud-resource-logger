import { CloudFormationClient, ListStacksCommand, DescribeStackResourcesCommand } from '@aws-sdk/client-cloudformation';

const listCloudFormationStacks = async (accessKeyId, secretAccessKey, region) => {
    const cfClient = new CloudFormationClient({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new ListStacksCommand({});
    const response = await cfClient.send(command);

    const stacks = response.StackSummaries.map(stack => ({
        name: stack.StackName,
        status: stack.StackStatus,
        creationTime: stack.CreationTime
    }));
    console.log('CloudFormation Stacks:', stacks);
};

const listStackResources = async (accessKeyId, secretAccessKey, region, stackName) => {
    const cfClient = new CloudFormationClient({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new DescribeStackResourcesCommand({ StackName: stackName });
    const response = await cfClient.send(command);

    const resources = response.StackResources.map(resource => ({
        logicalId: resource.LogicalResourceId,
        type: resource.ResourceType,
        status: resource.ResourceStatus
    }));
    console.log(`Resources in Stack ${stackName}:`, resources);
};

export { listCloudFormationStacks, listStackResources };
