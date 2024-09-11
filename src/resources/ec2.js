import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';

const listEC2Instances = async (accessKeyId, secretAccessKey, region) => {
    const ec2Client = new EC2Client({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new DescribeInstancesCommand({});
    const response = await ec2Client.send(command);

    const instances = response.Reservations.flatMap(reservation =>
        reservation.Instances.map(instance => ({
            InstanceId: instance.InstanceId,
            State: instance.State.Name
        }))
    );
    console.log('Active EC2 Instances:', instances);
};

export { listEC2Instances };
