import { AWSAccount } from '@interzonedev/aws-cdk-common';

export const APP_NAME = 'aws-cdk-networking';

export const DEPLOY_ACCOUNTS: AWSAccount[] = [
    {
        name: 'dev',
        number: '815332568426'
    }
];

export const DEPLOY_REGIONS: string[] = [
    'us-west-1',
    'us-west-2'
];
