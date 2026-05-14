variable "aws_region" {
  type    = string
  default = "us-east-2"
}

variable "aws_account_id" {
  type        = string
  description = "AWS account ID (e.g. output of: aws sts get-caller-identity --query Account --output text --profile YOUR_PROFILE)"
}

variable "aws_profile" {
  type        = string
  description = "AWS CLI profile name (see ~/.aws/credentials)"
}

variable "function_name" {
  type = string
}

variable "lambda_runtime" {
  type    = string
  default = "nodejs24.x"
}

variable "lambda_handler" {
  type    = string
  default = "dist/index.handler"
}
