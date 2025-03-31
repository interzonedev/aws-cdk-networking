import { Construct } from 'constructs';
import { CommonStage, CommonStageProps } from './common-stage';
import { NetworkingStage } from './networking-stage';
import { AWSAccount } from '../../config/environments';
import { Environment } from 'aws-cdk-lib/core/lib/environment';

export interface EnvironmentStageProps extends Omit<CommonStageProps, 'env'> {
    awsAccount: AWSAccount;
    region: string;
}

export class EnvironmentStage extends CommonStage {
    constructor(scope: Construct, id: string, props: EnvironmentStageProps) {
        super(scope, id, props);

        const {stackIdFragment, codeVersionHash, codeVersionRef, awsAccount, region} = props;

        const env: Environment = {
            account: awsAccount.number,
            region: region
        };
        console.log('env = %O', env);

        const commonStageProps: CommonStageProps = {
            stackIdFragment: stackIdFragment,
            codeVersionHash: codeVersionHash,
            codeVersionRef: codeVersionRef,
            env: env
        };

        new NetworkingStage(this, `networking`, commonStageProps);
    }
}
