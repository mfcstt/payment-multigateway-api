import { test } from '@japa/runner'
import { ToggleGatewayUseCase } from '#use_cases/gateway/toggle_gateway_use_case'

test.group('ToggleGatewayUseCase Unit', () => {
  test('should toggle gateway status', async ({ assert }) => {
    const mockGateway = { id: 1, is_active: true }
    const mockRepository: any = {
      toggleGateway: async () => Promise.resolve({ ...mockGateway, is_active: false }),
    }

    const useCase = new ToggleGatewayUseCase(mockRepository)
    const result = await useCase.execute(1)

    assert.equal(result.is_active, false)
  })
})
