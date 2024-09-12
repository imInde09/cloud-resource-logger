import { EKSClient, ListClustersCommand, ListNodegroupsCommand, DescribeNodegroupCommand } from '@aws-sdk/client-eks';

export const listEKSClusters = async (accessKeyId, secretAccessKey, region) => {
    const eksClient = new EKSClient({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    try {
        // List EKS Clusters
        const clustersCommand = new ListClustersCommand({});
        const clustersResponse = await eksClient.send(clustersCommand);
        const clusters = clustersResponse.clusters || [];

        console.log('EKS Clusters:', clusters);

        for (const clusterName of clusters) {
            // List Node Groups in each cluster
            const nodeGroupsCommand = new ListNodegroupsCommand({ clusterName });
            const nodeGroupsResponse = await eksClient.send(nodeGroupsCommand);
            const nodeGroups = nodeGroupsResponse.nodegroups || [];

            console.log(`Node groups in EKS Cluster ${clusterName}:`, nodeGroups);

            // Describe Node Group details
            for (const nodeGroupName of nodeGroups) {
                const describeNodeGroupCommand = new DescribeNodegroupCommand({ clusterName, nodegroupName: nodeGroupName });
                const nodeGroupDetailsResponse = await eksClient.send(describeNodeGroupCommand);
                console.log(`Node group details for ${nodeGroupName}:`, nodeGroupDetailsResponse.nodegroup);
            }
        }
    } catch (error) {
        console.error('Error fetching EKS clusters and node groups:', error);
    }
};
