import { KinesisClient, ListStreamsCommand, DescribeStreamCommand } from '@aws-sdk/client-kinesis';

const listKinesisStreams = async (accessKeyId, secretAccessKey, region) => {
    const kinesisClient = new KinesisClient({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new ListStreamsCommand({});
    const response = await kinesisClient.send(command);

    const streams = response.StreamNames;
    console.log('Kinesis Streams:', streams);
};

const describeKinesisStream = async (accessKeyId, secretAccessKey, region, streamName) => {
    const kinesisClient = new KinesisClient({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new DescribeStreamCommand({ StreamName: streamName });
    const response = await kinesisClient.send(command);

    const streamDetails = response.StreamDescription;
    console.log(`Details of Stream ${streamName}:`, streamDetails);
};

export { listKinesisStreams, describeKinesisStream };
