import { test } from '@japa/runner'
import { UpdatePriorityUseCase } from '#use_cases/gateway/update_priority_use_case'

test.group('UpdatePriorityUseCase Unit', () => {
  test('should update gateway priority', async ({ assert }) => {
    const mockRepository: any = {
      updatePriority: async (_id: number, priority: number) => Promise.resolve({ id: 1, priority }),
    }

    const useCase = new UpdatePriorityUseCase(mockRepository)
    const result = await useCase.execute(1, 5)

    assert.equal(result.priority, 5)
  })
})
