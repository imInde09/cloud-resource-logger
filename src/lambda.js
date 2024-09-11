import { LambdaClient, ListFunctionsCommand } from '@aws-sdk/client-lambda';

const listLambdaFunctions = async (accessKeyId, secretAccessKey, region) => {
    const lambdaClient = new LambdaClient({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new ListFunctionsCommand({});
    const response = await lambdaClient.send(command);

    const functions = response.Functions.map(fn => fn.FunctionName);
    console.log('Lambda Functions:', functions);
};

export { listLambdaFunctions };
