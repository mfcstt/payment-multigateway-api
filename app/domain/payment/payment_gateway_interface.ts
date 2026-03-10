// import type Gateways from "#models/gateways";
import type Gateway from "#models/gateway";

export interface PaymentGatewayInterface {
  // createTransaction(data: CreateTransactionInput): Promise<TransactionOutput>
  // refund(externalId: string): Promise<void>
  toggleGateway(id: number): Promise<Gateway>
  updatePriority(id: number, priority: number): Promise<Gateway>
}
