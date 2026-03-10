import type { TransactionRepositoryInterface } from '#domain/transactions/transaction_repository_interface'
import Transaction from '#models/transaction'
import TransactionProduct from '#models/transaction_product'

export class LucidPurchaseRepository implements TransactionRepositoryInterface {
  async findAll(client_id: number): Promise<Transaction[]> {
    const transactions = await Transaction.query().where('client_id', client_id)
    return transactions
  }
  async findAllWithoutClientFilter(): Promise<Transaction[]> {
    return await Transaction.all()
  }
  async findByid(id: number): Promise<Transaction> {
    const transaction = await Transaction.findByOrFail({ id })
    return transaction
  }
  async findByidWithProducts(id: number): Promise<any> {
    const transaction = await Transaction.find(id)
    if (!transaction) return null

    const products = await TransactionProduct.query().where('transaction_id', id).exec()

    return {
      ...transaction.toJSON(),
      products: products.map((tp) => ({
        product_id: tp.productId,
        quantity: tp.quantity,
      })),
    }
  }
  async create(data: Partial<Transaction>): Promise<Transaction> {
    return await Transaction.create(data as Transaction)
  }
  async update(id: number, data: Partial<Transaction>): Promise<Transaction> {
    const transaction = await Transaction.findByOrFail({ id })
    await transaction.merge(data).save()
    return transaction
  }

  async createTransactionProducts(
    transactionId: number,
    products: { product_id: number; quantity: number }[]
  ): Promise<void> {
    for (const p of products) {
      await TransactionProduct.create({
        transactionId: transactionId,
        productId: p.product_id,
        quantity: p.quantity,
      })
    }
  }
}
