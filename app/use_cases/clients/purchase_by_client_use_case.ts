import type { ClientRepositoryInterface } from '#domain/client/client_repository_interface'
import type { TransactionRepositoryInterface } from '#domain/transactions/transaction_repository_interface'
import ClientNotFoundException from '../../exceptions/client_not_found_exception.js'

export class PurchaseByClientUseCase {
  constructor(
    private clientRepository: ClientRepositoryInterface,
    private transactionRepository: TransactionRepositoryInterface
  ) {}

  async execute(clientId: number) {
    const client = await this.clientRepository.findById(clientId)
    if (!client) {
      throw new ClientNotFoundException(`Client ${clientId} not found`)
    }

    const transactions = await this.transactionRepository.findAll(clientId)
    return {
      client,
      transactions,
    }
  }
}
