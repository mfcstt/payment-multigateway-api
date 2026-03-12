import type { ClientRepositoryInterface } from '#domain/client/client_repository_interface'
import type { PaymentGatewayInterface } from '#domain/payment/payment_gateway_interface'
import type { ProductRepositoryInterface } from '#domain/product/product_repository_interface'
import type { TransactionRepositoryInterface } from '#domain/transactions/transaction_repository_interface'
import type { CreateTransactionInput } from '#domain/payment/payment_types'
import { GatewayStrategy } from '#services/gateway_strategy'
import GatewayUnavailableException from '../../exceptions/gateway_unavailable_exception.js'

type PaymentData = {
  email: string
  cardNumber: string
  cvv: string
}

type ProductInput = {
  product_id: number
  quantity: number
}

type ExecuteInput = {
  userEmail: string
  userName: string
  products: ProductInput[]
  payment: PaymentData
}

export default class ProcessPurchaseUseCase {
  constructor(
    private gatewayRepository: PaymentGatewayInterface,
    private transactionRepository: TransactionRepositoryInterface,
    private clientRepository: ClientRepositoryInterface,
    private productRepository: ProductRepositoryInterface
  ) {}

  async execute(input: ExecuteInput) {
    const { userEmail, userName, products, payment } = input

    let client = await this.clientRepository.findByEmail(userEmail)
    if (!client) {
      client = await this.clientRepository.create({ email: userEmail, name: userName })
    }

    const gateways = await this.gatewayRepository.findActiveByPriority()
    const gatewayStrategy = new GatewayStrategy()

    const totalAmount = await this.productRepository.calculeTotalAmount(products)

    for (const gateway of gateways) {
      const adapter = gatewayStrategy.getAdapter(gateway)

      try {
        if (adapter.authenticate) {
          await adapter.authenticate()
        }

        const gatewayInput: CreateTransactionInput = {
          amount: totalAmount,
          name: userName,
          email: userEmail,
          cardNumber: payment.cardNumber,
          cvv: payment.cvv,
        }

        const result = await adapter.createTransaction(gatewayInput)

        const cardLastNumbers = payment.cardNumber.slice(-4)

        const transaction = await this.transactionRepository.create({
          client_id: client.id,
          gateway_id: gateway.id,
          amount: totalAmount,
          status: 'success',
          external_id: result.externalId,
          card_last_numbers: cardLastNumbers,
        })

        await this.transactionRepository.createTransactionProducts(transaction.id, products)

        return { success: true, transaction }
      } catch (error) {
        console.error(`Gateway ${gateway.name} falhou:`, error)
        continue
      }
    }

    throw new GatewayUnavailableException('Todos os gateways de pagamento estão indisponíveis no momento. Por favor, tente novamente mais tarde.')
  }
}
