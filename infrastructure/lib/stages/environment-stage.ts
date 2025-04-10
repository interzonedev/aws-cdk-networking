import { Construct } from 'constructs';
import { NetworkingStage } from './networking-stage';
import { AWSAccount } from '../../config/environments';
import { Environment } from 'aws-cdk-lib/core/lib/environment';
import { CommonStage, CommonStageProps } from '@interzonedev/aws-cdk-common';

export interface EnvironmentStageProps extends Omit<CommonStageProps, 'env'> {
    awsAccount: AWSAccount;
    region: string;
    appName: string;
}

export class EnvironmentStage extends CommonStage {
    constructor(scope: Construct, id: string, props: EnvironmentStageProps) {
        super(scope, id, props);

        const {stackIdFragment, codeVersionHash, codeVersionRef, awsAccount, region, appName} = props;

        const env: Environment = {
            account: awsAccount.number,
            region: region
        };
        console.log('env = %O', env);

        const commonStageProps: CommonStageProps = {
            stackIdFragment: stackIdFragment,
            codeVersionHash: codeVersionHash,
            codeVersionRef: codeVersionRef,
            env: env,
            appName: appName
        };

        new NetworkingStage(this, `networking`, commonStageProps);
    }
}
