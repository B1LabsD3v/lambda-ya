/**
 * Persistence shapes (DynamoDB items, etc.).
 *
 * Define item attributes here and reuse them from `@infrastructure`.
 */
export interface ExampleItem {
  PK: string;
  SK: string;
  createdAt: string;
}
