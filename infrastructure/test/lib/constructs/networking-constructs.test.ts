import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { getConstructName, getStackName } from '../../../config/environments';
import { CommonStack, CommonStackProps } from '../../../lib/stacks/common-stack';
import { Construct } from 'constructs';
import { NetworkingConstructs } from '../../../lib/constructs/networking-constructs';

describe('NetworkingConstructs constructs created', () => {
    const testNetworkingConstructsProps = {
        stackIdFragment: 'test'
    };

    const testStackProps = {
        ...testNetworkingConstructsProps,
        stackName: getStackName('test', 'test'),
        codeVersionHash: 'abc123',
        codeVersionRef: 'main',
        substageType: 'test'
    };

    let template: Template;

    class TestStack extends CommonStack {
        constructor(scope: Construct, id: string, props: CommonStackProps) {
            super(scope, id, props);
        }
    }

    beforeEach(() => {
        const stack = new TestStack(new App(), 'test-stack', testStackProps);
        new NetworkingConstructs(stack, 'test-networking-constructs', testNetworkingConstructsProps);
        template = Template.fromStack(stack);
    });

    test('Code version hash output created', () => {
        template.hasOutput('*', {
            Value: testStackProps.codeVersionHash,
            Export: {
                Name: getConstructName(testNetworkingConstructsProps.stackIdFragment, `code-version-hash-${testStackProps.substageType}`)
            }
        });
    });

    test('Code version ref output created', () => {
        template.hasOutput('*', {
            Value: testStackProps.codeVersionRef,
            Export: {
                Name: getConstructName(testNetworkingConstructsProps.stackIdFragment, `code-version-ref-${testStackProps.substageType}`)
            }
        });
    });

    /*
    test('Status lambda function created', () => {
        template.hasResourceProperties('AWS::Lambda::Function', {
            FunctionName: getConstructName(testNetworkingConstructsProps.stackIdFragment, 'status-function')
        });
    });

    test('Status API gateway created', () => {
        template.hasResourceProperties('AWS::ApiGateway::RestApi', {
            Name: getConstructName(testNetworkingConstructsProps.stackIdFragment, 'status-api-gateway')
        });
    });
    */
});
