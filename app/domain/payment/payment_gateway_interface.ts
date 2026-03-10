import type { CreateTransactionInput, TransactionOutput } from "./payment_types.ts";

export interface PaymentGatewayInterface {
  createTransaction(data: CreateTransactionInput): Promise<TransactionOutput>
  refund(externalId: string): Promise<void>
}
