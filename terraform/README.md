# Terraform Infrastructure

Provisions the AWS infrastructure for the Rwanda Cultural Archives project.

## Resources Created

- VPC with DNS support
- Public subnet
- Internet Gateway
- Route Table
- Security Group (SSH, HTTP, HTTPS)
- EC2 instance (Amazon Linux 2023)

## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/install) v1.0+
- [AWS CLI](https://aws.amazon.com/cli/) configured with valid credentials
- An EC2 Key Pair created in your target AWS region

## Setup

**1. Configure AWS credentials**
```bash
aws configure
```

**2. Initialize Terraform**
```bash
cd terraform
terraform init
```

**3. Create `terraform.tfvars`**
```hcl
key_name = "your-key-pair-name"
```

**4. Preview changes**
```bash
terraform plan
```

**5. Apply configuration**
```bash
terraform apply
```

## Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `aws_region` | AWS region | `us-east-1` |
| `project_name` | Name used for resource tagging | `rwanda-cultural-archives` |
| `instance_type` | EC2 instance type | `t3.micro` |
| `vpc_cidr` | VPC CIDR block | `10.0.0.0/16` |
| `subnet_cidr` | Public subnet CIDR block | `10.0.1.0/24` |
| `availability_zone` | Availability zone | `us-east-1a` |
| `key_name` | EC2 Key Pair name | *(required)* |

## Outputs

| Output | Description |
|--------|-------------|
| `instance_public_ip` | Public IP of the EC2 instance |
| `instance_id` | EC2 instance ID |
| `vpc_id` | VPC ID |

## Teardown

To destroy all provisioned resources:
```bash
terraform destroy
```
