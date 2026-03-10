import type { PaymentGatewayInterface } from "#domain/payment/payment_gateway_interface";

export class ToggleGatewayUseCase {
  constructor(private paymentGatewayRepository: PaymentGatewayInterface) {}

  async execute(id: number) {
    return this.paymentGatewayRepository.toggleGateway(id);
  }
}