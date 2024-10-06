# cloud-resource-logger - Source Code Overview

This directory contains the source code for the `cloud-resource-logger` CLI tool. The tool helps in managing and listing AWS resources.

## File Structure

- **`src/`**: Contains the source files for the CLI tool.
  - **`resources/`**: Contains separate files for each AWS service resource.
    - **`ec2.js`**: Handles listing of EC2 instances.
    - **`s3.js`**: Handles listing of S3 buckets.
    - **`lambda.js`**: Handles listing of Lambda functions.
    - **`dynamodb.js`**: Handles listing of DynamoDB tables.
    - **`iam.js`**: Handles listing of IAM users and their attached policies.
    - **`rds.js`**: Handles listing of RDS instances, clusters, and related details.
    - **`ecs.js`**: Handles listing of ECS clusters.
    - **`eks.js`**: Handles listing of EKS clusters.
    - **`cloudwatch.js`**: Handles listing of CloudWatch alarms.
    - **`cloudformation.js`**: Handles listing of CloudFormation stacks.
    - **`route53.js`**: Handles listing of Route 53 hosted zones.
    - **`sns.js`**: Handles listing of SNS topics.
    - **`ses.js`**: Handles listing of SES identities.
    - **`elb.js`**: Handles listing of load balancers.
    - **`kinesis.js`**: Handles listing of Kinesis streams.
  - **`listResources.js`**: Central file for listing resources based on the selected AWS service. It imports functionality from individual service files in the `resources/` folder.
  - **`environmentManager.js`**: Manages environment setup and teardown, including saving and removing AWS credentials.

- **`index.js`**: Entry point for the CLI tool. Configures and manages CLI commands using the `commander` library.

- **`package.json`**: Contains metadata about the project and its dependencies.

- **`config.json`** (optional): Created when saving AWS credentials. Used to store credentials for authenticated AWS API calls.

- **`node_modules/`**: Contains project dependencies.

## Functionality

- **Start Environment**: Prompts for AWS credentials and saves them in `config.json`.
- **Stop Environment**: Removes `config.json`, thereby deleting saved credentials.
- **List Resources**: Lists AWS resources based on the specified service:
  - `ec2` - Lists EC2 instances.
  - `s3` - Lists S3 buckets.
  - `lambda` - Lists Lambda functions.
  - `dynamodb` - Lists DynamoDB tables.
  - `iam` - Lists IAM users and attached policies.
  - `rds` - Lists RDS instances, clusters, and related details.
  - `ecs` - Lists ECS clusters.
  - `eks` - Lists EKS clusters.
  - `cloudwatch` - Lists CloudWatch alarms.
  - `cloudformation` - Lists CloudFormation stacks.
  - `route53` - Lists Route 53 hosted zones.
  - `sns` - Lists SNS topics.
  - `ses` - Lists SES identities.
  - `elb` - Lists load balancers.
  - `kinesis` - Lists Kinesis streams.

## Usage

Refer to the [README](./README.md) for usage instructions and command examples.
