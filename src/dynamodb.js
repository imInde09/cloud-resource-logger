import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';

const listDynamoDBTables = async (accessKeyId, secretAccessKey, region) => {
    const dynamoClient = new DynamoDBClient({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new ListTablesCommand({});
    const response = await dynamoClient.send(command);

    const tables = response.TableNames;
    console.log('DynamoDB Tables:', tables);
};

export { listDynamoDBTables };
