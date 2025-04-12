import { Construct } from 'constructs';
import { NetworkingStack } from '../stacks/networking-stack';
import { APP_NAME } from '../../config/environments';
import { CommonStage, CommonStageProps, getStackName } from '@interzonedev/aws-cdk-common';

export interface NetworkingStageProps extends CommonStageProps {
}

export class NetworkingStage extends CommonStage {
    constructor(scope: Construct, id: string, props: NetworkingStageProps) {
        super(scope, id, props);

        const {stackIdFragment, codeVersionHash, codeVersionRef} = props;

        new NetworkingStack(this, 'networking-stack', {
            stackName: getStackName(APP_NAME, stackIdFragment, 'networking'),
            appName: APP_NAME,
            stackIdFragment: stackIdFragment,
            codeVersionHash: codeVersionHash,
            codeVersionRef: codeVersionRef,
            exportSuffix: this.artifactId
        });
    }
}
