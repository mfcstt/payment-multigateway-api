import type { TransactionRepositoryInterface } from '#domain/transactions/transaction_repository_interface'

export default class ListAllPurchasesUseCase {
  constructor(private transactionRepository: TransactionRepositoryInterface) {}

  async execute() {
    return await this.transactionRepository.findAllWithoutClientFilter()
  }
}
