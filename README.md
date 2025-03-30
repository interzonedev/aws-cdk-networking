# Demo AWS CDK application to create networking constructs.

## Shell Commands

### Configure IAM Profile

```shell
aws configure --profile cdk-cli
```
Using:
```shell
AWS Access Key ID: accesskey
AWS Secret Access Key: secretkey
Default region name: us-west-1
Default output format: json
```

### Get Caller Identity

```shell
aws sts get-caller-identity --profile cdk-cli
```

### CDK Bootstrap

```shell
npx cdk bootstrap aws://815332568426/us-west-1 --profile cdk-cli --context stack-id-fragment=mm
```

### Get Bootstrap Parameter

```shell
aws ssm get-parameter \
  --name /cdk-bootstrap/hnb659fds/version \
  --profile cdk-cli \
  --region us-west-1
```

### CDK List (Verbose)

```shell
npx cdk list \
  --profile cdk-cli \
  --region us-west-1 \
  --verbose \
  --context stack-id-fragment=mm
```

