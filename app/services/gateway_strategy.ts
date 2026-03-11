import type { PaymentAdapterInterface } from "#domain/payment/payment_adapter_interface";
import { Gateway1Adapter } from "#infrastructure/gateways/gateway1.adapter";
import { Gateway2Adapter } from "#infrastructure/gateways/gateway2.adapter";
import type Gateway from "#models/gateway";

export class GatewayStrategy {
  private adapters: Record<string, PaymentAdapterInterface> = {
    'gateway1': new Gateway1Adapter(),
    'gateway2': new Gateway2Adapter(),
  }

  getAdapter(gateway: Gateway): PaymentAdapterInterface {
    const adapter = this.adapters[gateway.name.toLowerCase()]
    if (!adapter) {
      throw new Error(`Adapter para ${gateway.name} não encontrado`)
    }
    return adapter
  }
}