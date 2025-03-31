export const APP_NAME: string = 'aws-cdk-networking';
export const ABBREVIATED_APP_NAME: string = 'acn';

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

export const getAbbreviatedConstructName = (nameFragment: string, constructType: string) => {
    return `app-${ABBREVIATED_APP_NAME}-${nameFragment}-${constructType}`;
};
