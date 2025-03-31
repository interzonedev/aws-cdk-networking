import { App } from 'aws-cdk-lib';
import { DEPLOY_ACCOUNTS, DEPLOY_REGIONS } from '../config/environments';
import { EnvironmentStage } from '../lib/stages/environment-stage';

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

DEPLOY_ACCOUNTS.forEach(awsAccount =>
    DEPLOY_REGIONS.forEach(region =>
        new EnvironmentStage(app, `${awsAccount.name}-${region}`, {
            stackIdFragment: stackIdFragment,
            codeVersionHash: codeVersionHash,
            codeVersionRef: codeVersionRef,
            awsAccount: awsAccount,
            region: region
        })
    )
);
