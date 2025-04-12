import { Construct } from 'constructs';
import { APP_NAME } from '../../config/environments';
import { Stack } from 'aws-cdk-lib';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { CommonConstruct, CommonConstructProps } from '@interzonedev/aws-cdk-common';

export interface NetworkingConstructsProps extends CommonConstructProps {
}

export class NetworkingConstructs extends CommonConstruct {
    constructor(scope: Construct, id: string, props: NetworkingConstructsProps) {
        super(scope, id, props);

        const {appName, stackIdFragment} = props;

        new StringParameter(this, 'foo-param', {
            parameterName: `/app/${APP_NAME}/${stackIdFragment}/foo`,
            description: `Foo for ${Stack.of(this)}`,
            stringValue: 'foo'
        });
    }
}
