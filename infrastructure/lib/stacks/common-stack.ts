import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CommonConstructProps } from '../constructs/common-construct';
import { getConstructName } from '../../config/environments';

export interface CommonStackProps extends StackProps, CommonConstructProps {
    codeVersionHash?: string;
    codeVersionRef?: string;
}

export abstract class CommonStack extends Stack {
    protected constructor(scope: Construct, id: string, props: CommonStackProps) {
        super(scope, id, props);

        const {stackIdFragment, codeVersionHash, codeVersionRef} = props;

        if (codeVersionHash) {
            const codeVersionHashOutputId = `code-version-hash-${id}`;
            const codeVersionHashOutputName = getConstructName(stackIdFragment, codeVersionHashOutputId);
            new CfnOutput(this, codeVersionHashOutputId, {
                exportName: codeVersionHashOutputName,
                value: codeVersionHash
            });
        }

        if (codeVersionRef) {
            const codeVersionRefOutputId = `code-version-ref-${id}`;
            const codeVersionRefOutputName = getConstructName(stackIdFragment, codeVersionRefOutputId);
            new CfnOutput(this, codeVersionRefOutputId, {
                exportName: codeVersionRefOutputName,
                value: codeVersionRef
            });
        }
    }
}
