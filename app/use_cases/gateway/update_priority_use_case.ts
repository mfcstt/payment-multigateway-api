import type { PaymentGatewayInterface } from "#domain/payment/payment_gateway_interface";

export class UpdatePriorityUseCase {
  constructor(private paymentGatewayRepository: PaymentGatewayInterface) {}

  async execute(id: number, newPriority: number) {
    return this.paymentGatewayRepository.updatePriority(id, newPriority);
  }
}