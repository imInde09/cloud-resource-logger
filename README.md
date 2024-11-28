
# Cloud-Resource-Logger

**cloud-resource-logger** is a CLI tool for listing AWS resources such as EC2 instances, S3 buckets, Lambda functions, and DynamoDB tables. It prompts for AWS credentials and displays information about the specified resources.

## Download Statistics

![Total Downloads](https://img.shields.io/badge/total_downloads-1172-blue)
![Downloads This Week](https://img.shields.io/badge/this_week-0-green)
![Downloads Last Month](https://img.shields.io/badge/last_month-57-yellow)

## Installation

To install `cloud-resource-logger`, you can use npm. For global installation, run:

```bash
npm install -g cloud-resource-logger
```

## NPM Package

You can find the `cloud-resource-logger` package on npm at the following link:

[NPM Package: cloud-resource-logger](https://www.npmjs.com/package/cloud-resource-logger)

## Usage

To use `cloud-resource-logger`, you'll need to provide AWS credentials and specify the service you want to query.

### Start Environment

To start the environment and save AWS credentials, use the following command:

```bash
cloud-resource-logger start
```

This command will prompt you to enter your AWS credentials and save them for use with subsequent commands.

### Stop Environment

To stop the environment and remove saved AWS credentials, use the following command:

```bash
cloud-resource-logger stop
```

This command will remove the saved credentials, ensuring that subsequent commands prompt for credentials again.

### List EC2 Instances

To list all EC2 instances, use the following command:

```bash
cloud-resource-logger list --service ec2
```

### List S3 Buckets

To list all S3 buckets, use the following command:

```bash
cloud-resource-logger list --service s3
```

### List Lambda Functions

To list all Lambda functions, use the following command:

```bash
cloud-resource-logger list --service lambda
```

### List DynamoDB Tables

To list all DynamoDB tables, use the following command:

```bash
cloud-resource-logger list --service dynamodb
```

### List IAM Users and Policies

To list IAM users and their attached policies, use the following command:

```bash
cloud-resource-logger list --service iam
```

This will print all IAM users along with their attached policies.

### List RDS Instances

To list RDS instance details, use the following command:

```bash
cloud-resource-logger list --service rds
```

This will print information about available RDS instances, clusters, and other related details.

### List ECS Clusters

To list ECS clusters, use the following command:

```bash
cloud-resource-logger list --service ecs
```

### List EKS Clusters

To list EKS clusters, use the following command:

```bash
cloud-resource-logger list --service eks
```

### List CloudWatch Alarms

To list CloudWatch alarms, use the following command:

```bash
cloud-resource-logger list --service cloudwatch
```

### List CloudFormation Stacks

To list CloudFormation stacks, use the following command:

```bash
cloud-resource-logger list --service cloudformation
```

### List Route 53 Hosted Zones

To list Route 53 hosted zones, use the following command:

```bash
cloud-resource-logger list --service route53
```

### List SNS Topics

To list SNS topics, use the following command:

```bash
cloud-resource-logger list --service sns
```

### List SES Identities

To list SES identities, use the following command:

```bash
cloud-resource-logger list --service ses
```

### List Load Balancers

To list load balancers, use the following command:

```bash
cloud-resource-logger list --service elb
```

### List Kinesis Streams

To list Kinesis streams, use the following command:

```bash
cloud-resource-logger list --service kinesis
```

## Commands

- `start`: Start the environment and save AWS credentials.
- `stop`: Stop the environment and remove saved AWS credentials.
- `list --service <service>`: Specify the AWS service you want to query. Valid options are:
  - `ec2` - Lists all EC2 instances.
  - `s3` - Lists all S3 buckets.
  - `lambda` - Lists all Lambda functions.
  - `dynamodb` - Lists all DynamoDB tables.
  - `iam` - Lists IAM users and their attached policies.
  - `rds` - Lists RDS instances and clusters.
  - `ecs` - Lists ECS clusters.
  - `eks` - Lists EKS clusters.
  - `cloudwatch` - Lists CloudWatch alarms.
  - `cloudformation` - Lists CloudFormation stacks.
  - `route53` - Lists Route 53 hosted zones.
  - `sns` - Lists SNS topics.
  - `ses` - Lists SES identities.
  - `elb` - Lists load balancers.
  - `kinesis` - Lists Kinesis streams.

- `help`: Show this help message.

## Example

```bash
$ cloud-resource-logger start
Enter AWS Access Key ID: [Your Access Key ID]
Enter AWS Secret Access Key: [Your Secret Access Key]
Enter AWS Region: [Your AWS Region]

Environment started and AWS credentials saved.

$ cloud-resource-logger list --service ec2
Active EC2 Instances:
[ ... list of instances ... ]

$ cloud-resource-logger list --service s3
S3 Buckets:
[ ... list of buckets ... ]

$ cloud-resource-logger list --service iam
IAM Users and Policies:
[ ... list of users and attached policies ... ]

$ cloud-resource-logger list --service rds
RDS Instances:
[ ... list of RDS instances ... ]

$ cloud-resource-logger list --service ecs
ECS Clusters:
[ ... list of ECS clusters ... ]

$ cloud-resource-logger list --service eks
EKS Clusters:
[ ... list of EKS clusters ... ]

$ cloud-resource-logger list --service cloudwatch
CloudWatch Alarms:
[ ... list of alarms ... ]

$ cloud-resource-logger list --service cloudformation
CloudFormation Stacks:
[ ... list of stacks ... ]

$ cloud-resource-logger list --service route53
Route 53 Hosted Zones:
[ ... list of hosted zones ... ]

$ cloud-resource-logger list --service sns
SNS Topics:
[ ... list of topics ... ]

$ cloud-resource-logger list --service ses
SES Identities:
[ ... list of identities ... ]

$ cloud-resource-logger list --service elb
Load Balancers:
[ ... list of load balancers ... ]

$ cloud-resource-logger list --service kinesis
Kinesis Streams:
[ ... list of streams ... ]

$ cloud-resource-logger stop
Environment stopped and AWS credentials removed.
```

## Configuration

You will be prompted to enter the following AWS credentials:

- **AWS Access Key ID**
- **AWS Secret Access Key**
- **AWS Region**

These credentials are used to authenticate with AWS and fetch the relevant resource information.

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests. [See contributing guidelines](./CONTRIBUTE.md)

## Contact

For any questions or feedback, please reach out to Prathamesh Inde at <prathameshinde86@gmail.com>.

## Key Sections Included

- **Installation**: How to install the CLI tool.
- **Usage**: Instructions on how to use the tool with example commands.
- **Commands**: Detailed description of the available commands and their options.
- **Example**: Example usage of the commands.
- **Configuration**: Explanation of what credentials are required.
- **License**: Information about the license.
- **Contributing**: Instructions for contributing to the project. [See contributing guidelines](./CONTRIBUTE.md)
- **Contact**: How to contact you for support or feedback.

## File Structure and Functionality

For a detailed overview of the source code, including the file structure and functionality of each component, refer to the [File Structure](./FILESTRUCTURE.md).

---
Let me know if there are any further changes you’d like!

Thank you for using `cloud-resource-logger`!
