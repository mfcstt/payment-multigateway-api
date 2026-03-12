import type { PaymentGatewayInterface } from '#domain/payment/payment_gateway_interface'
import type { TransactionRepositoryInterface } from '#domain/transactions/transaction_repository_interface'
import { GatewayStrategy } from '#services/gateway_strategy'
import TransactionNotFoundException from '../../exceptions/transaction_not_found_exception.js'
import GatewayNotFoundException from '../../exceptions/gateway_not_found_exception.js'
import RefundFailedException from '../../exceptions/refund_failed_exception.js'

export default class RefundPurchaseUseCase {
  constructor(
    private gatewayRepository: PaymentGatewayInterface,
    private transactionRepository: TransactionRepositoryInterface
  ) {}

  async execute(id: number) {
    const transaction = await this.transactionRepository.findByidWithProducts(id)

    if (!transaction) {
      throw new TransactionNotFoundException(`Transaction ${id} not found`)
    }

    const gateway = await this.gatewayRepository.findById(transaction.gatewayId)
    const externalId = await this.transactionRepository.findByid(id).then((t) => t.external_id)

    if (!gateway) {
      throw new GatewayNotFoundException(`Gateway ${transaction.gatewayId} not found`)
    }

    if (!externalId) {
      throw new RefundFailedException(`External ID not found for transaction ${id}`)
    }

    const gatewayStrategy = new GatewayStrategy()
    const adapter = gatewayStrategy.getAdapter(gateway)

    try {
      if (adapter.authenticate) {
        await adapter.authenticate()
      }
    } catch (error) {
      throw new RefundFailedException(`Gateway authentication failed: ${error}`)
    }

    await adapter.refund(externalId)

    await this.transactionRepository.update(id, { status: 'refunded' })

    return { message: 'Reembolso processado com sucesso' }
  }
}
