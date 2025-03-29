import { App } from 'aws-cdk-lib';
import { NetworkingStage } from '../lib/stages/networking-stage';

const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION;

console.log('app.ts: account = %s', account);
console.log('app.ts: region = %s', region);

const app = new App();

const stackIdFragment = app.node.tryGetContext('stack-id-fragment');
const codeVersionHash = app.node.tryGetContext('code-version-hash');
const codeVersionRef = app.node.tryGetContext('code-version-ref');

console.log('app.ts: stackIdFragment = %s', stackIdFragment);
console.log('app.ts: codeVersionHash = %s', codeVersionHash);
console.log('app.ts: codeVersionRef = %s', codeVersionRef);

if (stackIdFragment === undefined) {
    console.error('stackIdFragment is undefined; usage: npx cdk [command] ' +
        '--context stack-id-fragment=[stack id fragment] --context code-version-hash=[Git code version hash]');
    process.exit(1);
}

new NetworkingStage(app, 'networking', {
    stackIdFragment: stackIdFragment,
    codeVersionHash: codeVersionHash,
    codeVersionRef: codeVersionRef,
    env: {
        account: account,
        region: region
    }
});
