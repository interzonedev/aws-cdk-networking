export const APP_NAME = 'aws-cdk-networking';

export const getStackName = (nameFragment: string, constructType: string) => {
    return `app-${APP_NAME}-${nameFragment}-${constructType}`;
};

export const getConstructName = (nameFragment: string, constructType: string) => {
    return `app-${APP_NAME}-${nameFragment}-${constructType}`;
};
