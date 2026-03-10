
import type { PaymentGatewayInterface } from "#domain/payment/payment_gateway_interface"
import Gateway from "#models/gateway"

export class LucidGatewayRepository implements PaymentGatewayInterface {
  async toggleGateway(id: number): Promise<Gateway> {
    const gateway = await Gateway.findOrFail(id)
      
    if (gateway.is_active) {
      gateway.is_active = false
    }
    else {
      gateway.is_active = true
    }

    gateway.merge(gateway)

    await gateway.save()
    return gateway
  }

  async updatePriority(id: number, priority: number): Promise<Gateway> {
    
    const gatewayToUpdate = await Gateway.findOrFail(id)
    const existingGateway = await Gateway.query().where('priority', priority).first()

    if (existingGateway) {
      const tempPriority = gatewayToUpdate.priority
      gatewayToUpdate.priority = existingGateway.priority
      existingGateway.priority = tempPriority

     await existingGateway.save()  
    }

    await gatewayToUpdate.save()
        return gatewayToUpdate
    }

    async findActiveByPriority(): Promise<Gateway[]> {
    return await Gateway.query()
    .where('is_active', true)
    .orderBy('priority', 'asc')
    }
 
}

