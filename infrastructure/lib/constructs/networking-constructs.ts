import { Construct } from 'constructs';
import { CommonConstruct, CommonConstructProps } from './common-construct';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { ARecord, PrivateHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { getConstructName } from '../../config/environments';

export interface NetworkingConstructsProps extends CommonConstructProps {
}

export class NetworkingConstructs extends CommonConstruct {
    constructor(scope: Construct, id: string, props: NetworkingConstructsProps) {
        super(scope, id, props);

        const {stackIdFragment} = props;

        const vpcId = 'vpc';
        const vpcName = getConstructName(stackIdFragment, vpcId);
        const vpc = new Vpc(this, vpcId, {
            vpcName: vpcName,
            maxAzs: 2,
            natGateways: 1
        });

        const privateHostedZone = new PrivateHostedZone(this, 'private-hosted-zone', {
            zoneName: 'aws.interzonedev.com',
            vpc: vpc
        });

        new ARecord(this, 'dns-a-record', {
            zone: privateHostedZone,
            recordName: 'api',
            target: RecordTarget.fromIpAddresses('10.0.1.100')
        });
    }
}
