import type { PaymentAdapterInterface } from '#domain/payment/payment_adapter_interface'
import type { CreateTransactionInput, TransactionOutput } from '#domain/payment/payment_types'
import axios from 'axios'

const GATEWAY_1_BASE_URL = process.env.GATEWAY_1_BASE_URL

export class Gateway1Adapter implements PaymentAdapterInterface {
  public token: string = ''

  async authenticate() {
    const response = await axios.post(`${GATEWAY_1_BASE_URL}/login`, {
      email: process.env.GATEWAY_1_EMAIL,
      token: process.env.GATEWAY_1_TOKEN,
    })
    this.token = response.data.token
  }

  async createTransaction(data: CreateTransactionInput): Promise<TransactionOutput> {
    const response = await axios.post(
      `${GATEWAY_1_BASE_URL}/transactions`,
      {
        amount: data.amount,
        name: data.name,
        email: data.email,
        cardNumber: data.cardNumber,
        cvv: data.cvv,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    )

    return {
      externalId: response.data.externalId ?? response.data.id,
    }
  }

  refund(externalId: string): Promise<void> {
    return axios.post(
      `${GATEWAY_1_BASE_URL}/transaction/${externalId}/charge_back`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    )
  }
}
