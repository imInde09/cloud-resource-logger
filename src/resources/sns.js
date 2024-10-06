import { SNSClient, ListTopicsCommand, ListSubscriptionsByTopicCommand } from '@aws-sdk/client-sns';

const listSNSTopics = async (accessKeyId, secretAccessKey, region) => {
    const snsClient = new SNSClient({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new ListTopicsCommand({});
    const response = await snsClient.send(command);

    const topics = response.Topics.map(topic => ({
        arn: topic.TopicArn
    }));
    console.log('SNS Topics:', topics);
};

const listTopicSubscriptions = async (accessKeyId, secretAccessKey, region, topicArn) => {
    const snsClient = new SNSClient({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new ListSubscriptionsByTopicCommand({ TopicArn: topicArn });
    const response = await snsClient.send(command);

    const subscriptions = response.Subscriptions.map(sub => ({
        endpoint: sub.Endpoint,
        protocol: sub.Protocol,
        status: sub.SubscriptionArn
    }));
    console.log(`Subscriptions for Topic ${topicArn}:`, subscriptions);
};

export { listSNSTopics, listTopicSubscriptions };
