
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

      
}

