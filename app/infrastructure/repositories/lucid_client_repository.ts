import type { ClientRepositoryInterface } from '#domain/client/client_repository_interface'
import Client from '#models/client'

export class LucidClientRepository implements ClientRepositoryInterface {
  async findByEmail(email: string) {
    const client = await Client.query().where('email', email).first()
    return client
  }

  async findById(id: number) {
    const client = await Client.query().where('id', id).first()
    return client
  }

  async create(data: { email: string; name?: string }) {
    const client = await Client.create(data)
    return client
  }

  async list() {
    const clients = await Client.query()
    return clients
  }
}
