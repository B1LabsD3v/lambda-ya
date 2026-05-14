/**
 * EXAMPLE — data access with **AWS SDK for JavaScript v3**.
 *
 * Recommended pattern:
 * - `DynamoDBClient` from `@aws-sdk/client-dynamodb`
 * - `DynamoDBDocumentClient` plus commands from `@aws-sdk/lib-dynamodb`
 *
 * After adding real calls, use the Cursor command **lambda-terraform-iam** (Terraform scaffold)
 * to align IAM policies in `__iac__/lambda.tf`.
 */
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import type { ExampleItem } from "@types_/db.types";

const doc = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function getExampleItem(tableName: string, pk: string, sk: string): Promise<ExampleItem | undefined> {
  const out = await doc.send(
    new GetCommand({
      TableName: tableName,
      Key: { PK: pk, SK: sk },
    }),
  );
  return out.Item as ExampleItem | undefined;
}
