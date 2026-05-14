data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda_exec" {
  name               = "${var.function_name}-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

resource "aws_iam_role_policy_attachment" "lambda_logging" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Add inline policies or attachments for real @aws-sdk/* usage (Cursor command: lambda-terraform-iam).

resource "aws_lambda_function" "this" {
  function_name    = var.function_name
  filename         = "${path.module}/../lambda.zip"
  handler          = var.lambda_handler
  runtime          = var.lambda_runtime
  role             = aws_iam_role.lambda_exec.arn
  timeout          = 30
  memory_size      = 256
  source_code_hash = fileexists("${path.module}/../lambda.zip") ? filebase64sha256("${path.module}/../lambda.zip") : null
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.this.function_name}"
  retention_in_days = 30
  depends_on        = [aws_lambda_function.this]
}
