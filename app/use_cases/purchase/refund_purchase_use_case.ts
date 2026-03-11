import type { PaymentGatewayInterface } from '#domain/payment/payment_gateway_interface'
import type { TransactionRepositoryInterface } from '#domain/transactions/transaction_repository_interface'
import { GatewayStrategy } from '#services/gateway_strategy'


export default class RefundPurchaseUseCase {
  constructor(
    private gatewayRepository: PaymentGatewayInterface,
    private transactionRepository: TransactionRepositoryInterface,
  ) {}

  async execute(id: number) {
   
    const transaction = await this.transactionRepository.findByidWithProducts(id);

    if (!transaction) {
      throw new Error('Transação não encontrada');
    }

    const gateway = await this.gatewayRepository.findById(transaction.gatewayId);
    const externalId = await this.transactionRepository.findByid(id).then(t => t.external_id);

    if (!gateway) {
      throw new Error('Gateway não encontrado');
    }

    if (!externalId) {
      throw new Error('ID externo da transação não encontrado');
    }

    const gatewayStrategy = new GatewayStrategy();
    const adapter = gatewayStrategy.getAdapter(gateway);

    
    try {
      if (adapter.authenticate) {
        await adapter.authenticate()
      }
    } catch (error) {
      throw new Error('Falha na autenticação com o gateway de pagamento');
    }
      
    await adapter.refund(externalId);
      
    await this.transactionRepository.update(id, { status: 'refunded' });

    return { message: 'Reembolso processado com sucesso' } 
    
}

  }

