import { ECSClient, ListClustersCommand, ListServicesCommand, ListTasksCommand, DescribeTasksCommand } from '@aws-sdk/client-ecs';

export const listECSClusters = async (accessKeyId, secretAccessKey, region) => {
    const ecsClient = new ECSClient({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    try {
        // List ECS Clusters
        const clustersCommand = new ListClustersCommand({});
        const clustersResponse = await ecsClient.send(clustersCommand);
        const clusters = clustersResponse.clusterArns || [];

        console.log('ECS Clusters:', clusters);

        for (const clusterArn of clusters) {
            // List Services in each cluster
            const servicesCommand = new ListServicesCommand({ cluster: clusterArn });
            const servicesResponse = await ecsClient.send(servicesCommand);
            const services = servicesResponse.serviceArns || [];

            console.log(`Services in ECS Cluster ${clusterArn}:`, services);

            // List Tasks in each service
            for (const serviceArn of services) {
                const tasksCommand = new ListTasksCommand({ cluster: clusterArn, serviceName: serviceArn });
                const tasksResponse = await ecsClient.send(tasksCommand);
                const tasks = tasksResponse.taskArns || [];

                if (tasks.length > 0) {
                    const describeTasksCommand = new DescribeTasksCommand({ cluster: clusterArn, tasks });
                    const taskDetailsResponse = await ecsClient.send(describeTasksCommand);
                    console.log(`Running tasks for service ${serviceArn}:`, taskDetailsResponse.tasks);
                } else {
                    console.log(`No running tasks for service ${serviceArn}`);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching ECS clusters and services:', error);
    }
};
