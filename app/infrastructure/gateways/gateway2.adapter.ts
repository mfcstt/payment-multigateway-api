import type { PaymentAdapterInterface } from '#domain/payment/payment_adapter_interface'
import type { CreateTransactionInput, TransactionOutput } from '#domain/payment/payment_types'
import axios from 'axios'

const GATEWAY_2_BASE_URL = process.env.GATEWAY_2_BASE_URL

export class Gateway2Adapter implements PaymentAdapterInterface {
  async createTransaction(data: CreateTransactionInput): Promise<TransactionOutput> {
    const response = await axios.post(
      `${GATEWAY_2_BASE_URL}/transacoes`,
      {
        valor: data.amount,
        nome: data.name,
        email: data.email,
        numeroCartao: data.cardNumber,
        cvv: data.cvv,
      },
      {
        headers: {
          'Gateway-Auth-Token': process.env.GATEWAY_2_AUTH_TOKEN,
          'Gateway-Auth-Secret': process.env.GATEWAY_2_AUTH_SECRET,
        },
      }
    )

    return {
      externalId: response.data.externalId ?? response.data.id,
    }
  }

  refund(externalId: string): Promise<void> {
    return axios.post(
      `${GATEWAY_2_BASE_URL}/transacoes/reembolso`,
      { externalId },
      {
        headers: {
          'Gateway-Auth-Token': process.env.GATEWAY_2_AUTH_TOKEN,
          'Gateway-Auth-Secret': process.env.GATEWAY_2_AUTH_SECRET,
        },
      }
    )
  }
}
