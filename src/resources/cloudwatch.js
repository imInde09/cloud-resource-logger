import { CloudWatchClient, DescribeAlarmsCommand } from '@aws-sdk/client-cloudwatch';

const listCloudWatchAlarms = async (accessKeyId, secretAccessKey, region) => {
    const cloudWatchClient = new CloudWatchClient({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new DescribeAlarmsCommand({});
    const response = await cloudWatchClient.send(command);

    const alarms = response.MetricAlarms.map(alarm => ({
        name: alarm.AlarmName,
        state: alarm.StateValue,
        metric: alarm.MetricName
    }));
    console.log('CloudWatch Alarms:', alarms);
};

export { listCloudWatchAlarms };
