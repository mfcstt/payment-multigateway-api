import { test } from '@japa/runner'
import { ListClientsUseCase } from '#use_cases/clients/list_clients_use_cases'

test.group('ListClientsUseCase Unit', () => {
  test('should return clients list', async ({ assert }) => {
    const mockClients = [
      { id: 1, name: 'Client 1', email: 'client1@test.com' },
      { id: 2, name: 'Client 2', email: 'client2@test.com' },
    ]
    const mockRepository: any = {
      list: async () => Promise.resolve(mockClients),
    }

    const useCase = new ListClientsUseCase(mockRepository)
    const result = await useCase.execute()

    assert.lengthOf(result, 2)
  })
})
