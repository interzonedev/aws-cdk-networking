import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ManagedPolicy, PermissionsBoundary } from 'aws-cdk-lib/aws-iam';
import { CommonConstructProps } from '../constructs/common-construct';
import { getConstructName } from '../../config/environments';

export interface CommonStackProps extends StackProps, CommonConstructProps {
    codeVersionHash?: string;
    codeVersionRef?: string;
    substageType: string;
}

export abstract class CommonStack extends Stack {
    protected constructor(scope: Construct, id: string, props: CommonStackProps) {
        super(scope, id, props);

        /*
        PermissionsBoundary
            .of(this)
            .apply(ManagedPolicy.fromManagedPolicyName(this, 'permission-boundary', 'appboundary-cfn-custom-resource'));
        */

        const {stackIdFragment, codeVersionHash, codeVersionRef, substageType} = props;

        if (codeVersionHash) {
            const codeVersionHashOutputId = `code-version-hash-${substageType}`;
            const codeVersionHashOutputName = getConstructName(stackIdFragment, codeVersionHashOutputId);
            new CfnOutput(this, codeVersionHashOutputId, {
                exportName: codeVersionHashOutputName,
                value: codeVersionHash
            });
        }

        if (codeVersionRef) {
            const codeVersionRefOutputId = `code-version-ref-${substageType}`;
            const codeVersionRefOutputName = getConstructName(stackIdFragment, codeVersionRefOutputId);
            new CfnOutput(this, codeVersionRefOutputId, {
                exportName: codeVersionRefOutputName,
                value: codeVersionRef
            });
        }
    }
}
