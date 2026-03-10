import type Client from '#models/client'

export interface ClientRepositoryInterface {
  findById(id: number): Promise<Client | null>
  findByEmail(email: string): Promise<Client | null>
  create(data: { email: string; name?: string }): Promise<Client>
  list(): Promise<Client[]>
}
