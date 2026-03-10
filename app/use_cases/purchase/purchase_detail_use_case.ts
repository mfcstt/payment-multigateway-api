import type { TransactionRepositoryInterface } from "#domain/transactions/transaction_repository_interface";

export default class PurchaseDetailUseCase {
  constructor(private transactionRepository: TransactionRepositoryInterface) {}

  async execute(id: number) {
    return await this.transactionRepository.findByidWithProducts(id);
  }

}