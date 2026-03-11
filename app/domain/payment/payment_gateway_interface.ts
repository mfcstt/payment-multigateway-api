import type Gateway from '#models/gateway'

export interface PaymentGatewayInterface {
  findById(id: number): Promise<Gateway | null>
  toggleGateway(id: number): Promise<Gateway>
  updatePriority(id: number, priority: number): Promise<Gateway>
  findActiveByPriority(): Promise<Gateway[]>
}
