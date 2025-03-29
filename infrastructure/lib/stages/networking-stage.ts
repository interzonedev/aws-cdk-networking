import { Construct } from 'constructs';
import { NetworkingStack } from '../stacks/networking-stack';
import { getStackName } from '../../config/environments';
import { CommonStage, CommonStageProps } from './common-stage';

export interface NetworkingStageProps extends CommonStageProps {
}

export class NetworkingStage extends CommonStage {
    constructor(scope: Construct, id: string, props: NetworkingStageProps) {
        super(scope, id, props);

        const {stackIdFragment, codeVersionHash, codeVersionRef} = props;

        new NetworkingStack(this, 'networking-stack', {
            stackName: getStackName(stackIdFragment, 'networking'),
            stackIdFragment: stackIdFragment,
            codeVersionHash: codeVersionHash,
            codeVersionRef: codeVersionRef,
            substageType: 'networking'
        });
    }
}