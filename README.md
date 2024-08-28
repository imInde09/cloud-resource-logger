
# Cloud-Resource-Logger

**cloud-resource-logger** is a CLI tool for listing AWS resources such as EC2 instances and S3 buckets. It prompts for AWS credentials and displays information about the specified resources.

## Installation

To install `cloud-resource-logger`, you can use npm. For global installation, run:

```bash
npm install -g cloud-resource-logger
```

## Usage

To use `cloud-resource-logger`, you'll need to provide AWS credentials and specify the service you want to query.

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

## Commands

- `list --service <service>`: Specify the AWS service you want to query. Valid options are:
  - `ec2` - Lists all EC2 instances.
  - `s3` - Lists all S3 buckets.

- `help`: Show this help message.

## Example

```bash
$ cloud-resource-logger list --service ec2
Enter AWS Access Key ID: [Your Access Key ID]
Enter AWS Secret Access Key: [Your Secret Access Key]
Enter AWS Region: [Your AWS Region]

Active EC2 Instances:
[ ... list of instances ... ]

$ cloud-resource-logger list --service s3
Enter AWS Access Key ID: [Your Access Key ID]
Enter AWS Secret Access Key: [Your Secret Access Key]
Enter AWS Region: [Your AWS Region]

S3 Buckets:
[ ... list of buckets ... ]
```

## Configuration

You will be prompted to enter the following AWS credentials:

- **AWS Access Key ID**
- **AWS Secret Access Key**
- **AWS Region**

These credentials are used to authenticate with AWS and fetch the relevant resource information.

## License

MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests.

## Contact

For any questions or feedback, please reach out to Prathamesh Inde at <prathameshinde86@gmail.com>.

---

Thank you for using `cloud-resource-logger`!


## Key Sections Included:

- **Installation**: How to install the CLI tool.
- **Usage**: Instructions on how to use the tool with example commands.
- **Commands**: Detailed description of the available commands and their options.
- **Example**: Example usage of the commands.
- **Configuration**: Explanation of what credentials are required.
- **License**: Information about the license.
- **Contributing**: Instructions for contributing to the project.
- **Contact**: How to contact you for support or feedback.

Feel free to adjust the contact information and any other details as needed.

