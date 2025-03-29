import { Stage, StageProps, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { APP_NAME } from '../../config/environments';

export interface CommonStageProps extends StageProps {
    stackIdFragment: string;
    codeVersionHash?: string;
    codeVersionRef?: string;
}

export abstract class CommonStage extends Stage {
    protected constructor(scope: Construct, id: string, props: CommonStageProps) {
        super(scope, id, props);

        Tags.of(this).add('app-name', APP_NAME);
    }
}
