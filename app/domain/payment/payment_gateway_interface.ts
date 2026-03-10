import type Gateway from '#models/gateway'

export interface PaymentGatewayInterface {
  toggleGateway(id: number): Promise<Gateway>
  updatePriority(id: number, priority: number): Promise<Gateway>
  findActiveByPriority(): Promise<Gateway[]>
}
