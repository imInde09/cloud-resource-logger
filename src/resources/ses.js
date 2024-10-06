import { SESClient, ListIdentitiesCommand, GetSendStatisticsCommand } from '@aws-sdk/client-ses';

const listSESIdentities = async (accessKeyId, secretAccessKey, region) => {
    const sesClient = new SESClient({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new ListIdentitiesCommand({});
    const response = await sesClient.send(command);

    const identities = response.Identities;
    console.log('SES Verified Identities:', identities);
};

const listSendStatistics = async (accessKeyId, secretAccessKey, region) => {
    const sesClient = new SESClient({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new GetSendStatisticsCommand({});
    const response = await sesClient.send(command);

    const statistics = response.SendDataPoints.map(stat => ({
        deliveryAttempts: stat.DeliveryAttempts,
        bounces: stat.Bounces,
        complaints: stat.Complaints,
        timestamp: stat.Timestamp
    }));
    console.log('SES Sending Statistics:', statistics);
};

export { listSESIdentities, listSendStatistics };
