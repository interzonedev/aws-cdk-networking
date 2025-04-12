import { Construct } from 'constructs';
import { CommonStack, CommonStackProps } from '@interzonedev/aws-cdk-common';
import { NetworkingConstructsProps, NetworkingConstructs } from '../constructs/networking-constructs';

export interface NetworkingStackProps extends CommonStackProps, NetworkingConstructsProps {
}

export class NetworkingStack extends CommonStack {
    constructor(scope: Construct, id: string, props: NetworkingStackProps) {
        super(scope, id, props);

        new NetworkingConstructs(this, 'networking-constructs', props);
    }
}
