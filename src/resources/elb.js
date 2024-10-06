import { ElasticLoadBalancingV2Client, DescribeLoadBalancersCommand } from '@aws-sdk/client-elastic-load-balancing-v2';

const listLoadBalancers = async (accessKeyId, secretAccessKey, region) => {
    const elbClient = new ElasticLoadBalancingV2Client({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new DescribeLoadBalancersCommand({});
    const response = await elbClient.send(command);

    const loadBalancers = response.LoadBalancers.map(lb => ({
        name: lb.LoadBalancerName,
        type: lb.Type,
        state: lb.State.Code,
        dnsName: lb.DNSName
    }));
    console.log('Load Balancers:', loadBalancers);
};

export { listLoadBalancers };
