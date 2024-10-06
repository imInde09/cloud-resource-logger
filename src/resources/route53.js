import { Route53Client, ListHostedZonesCommand, ListResourceRecordSetsCommand } from '@aws-sdk/client-route-53';

const listRoute53HostedZones = async (accessKeyId, secretAccessKey, region) => {
    const route53Client = new Route53Client({
        region,
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new ListHostedZonesCommand({});
    const response = await route53Client.send(command);

    const hostedZones = response.HostedZones.map(zone => ({
        id: zone.Id,
        name: zone.Name,
        privateZone: zone.Config.PrivateZone
    }));
    console.log('Hosted Zones:', hostedZones);
};

const listDNSRecords = async (accessKeyId, secretAccessKey, hostedZoneId) => {
    const route53Client = new Route53Client({
        credentials: { accessKeyId, secretAccessKey }
    });
    const command = new ListResourceRecordSetsCommand({ HostedZoneId: hostedZoneId });
    const response = await route53Client.send(command);

    const records = response.ResourceRecordSets.map(record => ({
        name: record.Name,
        type: record.Type,
        value: record.ResourceRecords ? record.ResourceRecords.map(rr => rr.Value) : []
    }));
    console.log(`DNS Records for Hosted Zone ${hostedZoneId}:`, records);
};

export { listRoute53HostedZones, listDNSRecords };
