// src/rds.js
import { RDSClient, DescribeDBInstancesCommand, DescribeDBClustersCommand } from '@aws-sdk/client-rds';

export const listRDSInstances = async (accessKeyId, secretAccessKey, region) => {
    const rdsClient = new RDSClient({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    try {
        // Get DB Instances
        const instancesCommand = new DescribeDBInstancesCommand({});
        const instancesResponse = await rdsClient.send(instancesCommand);
        const instances = instancesResponse.DBInstances.map(instance => ({
            DBInstanceIdentifier: instance.DBInstanceIdentifier,
            DBInstanceClass: instance.DBInstanceClass,
            Engine: instance.Engine,
            DBInstanceStatus: instance.DBInstanceStatus,
        }));

        // Get DB Clusters
        const clustersCommand = new DescribeDBClustersCommand({});
        const clustersResponse = await rdsClient.send(clustersCommand);
        const clusters = clustersResponse.DBClusters.map(cluster => ({
            DBClusterIdentifier: cluster.DBClusterIdentifier,
            Engine: cluster.Engine,
            Status: cluster.Status,
        }));

        console.log('RDS Instances:', instances);
        console.log('RDS Clusters:', clusters);
    } catch (error) {
        console.error('Error fetching RDS resources:', error);
    }
};
