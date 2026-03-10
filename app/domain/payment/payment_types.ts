export interface CreateTransactionInput {
  amount: number
  name: string
  email: string
  cardNumber: string
  cvv: string
}

export interface TransactionOutput {
  externalId: string
}
