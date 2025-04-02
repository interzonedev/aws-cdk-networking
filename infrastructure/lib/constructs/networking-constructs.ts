import { Construct } from 'constructs';
import { CommonConstruct, CommonConstructProps } from './common-construct';
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { ARecord, CnameRecord, PrivateHostedZone, PublicHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { getAbbreviatedConstructName, getConstructName } from '../../config/environments';
import { NetworkLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

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
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'public-subnet',
                    subnetType: SubnetType.PUBLIC
                },
                {
                    cidrMask: 24,
                    name: 'private-subnet',
                    subnetType: SubnetType.PRIVATE_WITH_EGRESS // For private with internet access via NAT
                }
            ],
            natGateways: 1 // Required for PRIVATE_WITH_EGRESS subnets
        });

        const privateVPCSubnets = vpc.selectSubnets({
            subnetGroupName: 'private-subnet'
        });

        const publicHostedZone = new PublicHostedZone(this, 'public-hosted-zone', {
            zoneName: 'public.interzonedev.com'
        });

        const privateHostedZone = new PrivateHostedZone(this, 'private-hosted-zone', {
            zoneName: 'private.interzonedev.com',
            vpc: vpc
        });

        const loadBalancerId = 'load-balancer';
        const loadBalancerName = getAbbreviatedConstructName(stackIdFragment, 'lb');
        const loadBalancer = new NetworkLoadBalancer(this, loadBalancerId, {
            loadBalancerName: loadBalancerName,
            vpc: vpc,
            vpcSubnets: privateVPCSubnets,
            internetFacing: false
        });

        // A Record in Public Zone
        new ARecord(this, 'public-dns-a-record', {
            zone: publicHostedZone,
            recordName: 'app',
            target: RecordTarget.fromIpAddresses('1.2.3.4')
        });

        // CNAME Record in Public Zone
        new CnameRecord(this, 'public-dns-cname-record', {
            zone: publicHostedZone,
            recordName: 'www',
            domainName: 'interzonedev.com'
        });

        // A Record in Private Zone
        new ARecord(this, 'private-dns-a-record', {
            zone: privateHostedZone,
            recordName: 'internal',
            target: RecordTarget.fromIpAddresses('10.0.0.5')
        });

        // CNAME Record in Private Zone
        new CnameRecord(this, 'private-dns-cname-record', {
            zone: privateHostedZone,
            recordName: 'service',
            domainName: 'my-service.private.interzonedev.com'
        });
    }
}
