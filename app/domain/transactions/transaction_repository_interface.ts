import type Transaction from '#models/transaction'

export interface TransactionRepositoryInterface {
  findAll(client_id: number): Promise<Transaction[]>
  findAllWithoutClientFilter(): Promise<Transaction[]>
  findByid(id: number): Promise<Transaction>
  findByidWithProducts(id: number): Promise<any>
  create(data: Partial<Transaction>): Promise<Transaction>
  update(id: number, data: Partial<Transaction>): Promise<Transaction>
  createTransactionProducts(
    transaction_id: number,
    products: { product_id: number; quantity: number }[]
  ): Promise<void>
}
