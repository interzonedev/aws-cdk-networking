export const APP_NAME = 'aws-cdk-networking';

export interface AWSAccount {
    name: string;
    number: string;
}

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

export const getStackName = (nameFragment: string, constructType: string): string => {
    return `app-${APP_NAME}-${nameFragment}-${constructType}`;
};

export const getConstructName = (nameFragment: string, constructType: string): string => {
    return `app-${APP_NAME}-${nameFragment}-${constructType}`;
};
