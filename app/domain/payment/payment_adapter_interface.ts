import type { CreateTransactionInput, TransactionOutput } from '#domain/payment/payment_types'

export interface PaymentAdapterInterface {
  createTransaction(data: CreateTransactionInput): Promise<TransactionOutput>
  authenticate?(): Promise<void>
  refund(externalId: string): Promise<void>
}
