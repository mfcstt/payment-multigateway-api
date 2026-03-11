import type { PaymentGatewayInterface } from '#domain/payment/payment_gateway_interface'
import Gateway from '#models/gateway'

export class LucidGatewayRepository implements PaymentGatewayInterface {
  async toggleGateway(id: number): Promise<Gateway> {
    const gateway = await Gateway.findOrFail(id)

    if (gateway.is_active) {
      gateway.is_active = false
    } else {
      gateway.is_active = true
    }

    gateway.merge(gateway)

    await gateway.save()
    return gateway
  }

  async updatePriority(id: number, newPriority: number): Promise<Gateway> {
    const gatewayToUpdate = await Gateway.findOrFail(id)
    const oldPriority = gatewayToUpdate.priority

    if (newPriority < oldPriority) {
      await Gateway.query()
        .where('priority', '>=', newPriority)
        .andWhere('priority', '<', oldPriority)
        .increment('priority', 1)
    } else if (newPriority > oldPriority) {
      await Gateway.query()
        .where('priority', '>', oldPriority)
        .andWhere('priority', '<=', newPriority)
        .decrement('priority', 1)
    }

    gatewayToUpdate.priority = newPriority
    await gatewayToUpdate.save()

    return gatewayToUpdate
  }

  async findActiveByPriority(): Promise<Gateway[]> {
    return await Gateway.query().where('is_active', true).orderBy('priority', 'asc')
  }

  async findById(id: number): Promise<Gateway | null> {
    return await Gateway.find(id)
  }
}
