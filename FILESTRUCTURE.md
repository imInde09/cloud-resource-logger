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

## Usage

Refer to the [README](./README.md) for usage instructions and command examples.

