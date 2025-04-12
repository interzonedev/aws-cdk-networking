import { Construct } from 'constructs';
import { CommonStageProps, EnvironmentStage, EnvironmentStageProps } from '@interzonedev/aws-cdk-common';
import { NetworkingStage } from './networking-stage';

export interface ACNEnvironmentStageProps extends EnvironmentStageProps {
}

export class ACNEnvironmentStage extends EnvironmentStage {
    constructor(scope: Construct, id: string, props: ACNEnvironmentStageProps) {
        super(scope, id, props);
    }

    protected createSubStages(commonStageProps: CommonStageProps) {
        new NetworkingStage(this, `networking`, commonStageProps);
    }
}
