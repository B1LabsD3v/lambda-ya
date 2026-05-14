/**
 * EXAMPLE — `@repositories` layer using **AWS SDK for JavaScript v3**.
 *
 * Pattern: `DynamoDBClient` + `DynamoDBDocumentClient` + commands from `@aws-sdk/lib-dynamodb`.
 * When you define real resources, align IAM in `__iac__` (Cursor command **lambda-terraform-iam** on Terraform scaffolds).
 */
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import type { ExampleItem } from "@types_/db.types";

const doc = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function getExampleItem(tableName: string, pk: string, sk: string): Promise<ExampleItem | undefined> {
  const out = await doc.send(new GetCommand({ TableName: tableName, Key: { PK: pk, SK: sk } }));
  return out.Item as ExampleItem | undefined;
}
