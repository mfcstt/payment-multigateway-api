import { LucidGatewayRepository } from '#infrastructure/repositories/lucid_gateway_repository'
import { ToggleGatewayUseCase } from '#use_cases/gateway/toggle_gateway_use_case'
import { UpdatePriorityUseCase } from '#use_cases/gateway/update_priority_use_case'
import type { HttpContext } from '@adonisjs/core/http'
import { gatewayToggleValidator, gatewayPriorityValidator } from '#validators/gateway'

const lucidGatewayRepository = new LucidGatewayRepository()
const toggleGatewayUseCase = new ToggleGatewayUseCase(lucidGatewayRepository)
const updatePriorityUseCase = new UpdatePriorityUseCase(lucidGatewayRepository)

export default class GatewayController {
  public async toggle({ request, response, bouncer, params }: HttpContext) {
    await bouncer.with('Policy').authorize('canManageGateways')

    const { id } = await request.validateUsing(gatewayToggleValidator, {
      data: { id: params.id },
    })

    const gateway = await toggleGatewayUseCase.execute(id)

    return response.ok(gateway)
  }

  public async updatePriority({ request, response, bouncer, params }: HttpContext) {
    await bouncer.with('Policy').authorize('canManageGateways')

    const { id, priority } = await request.validateUsing(gatewayPriorityValidator, {
      data: { ...params },
    })

    const gateway = await updatePriorityUseCase.execute(id, priority)

    return response.ok(gateway)
  }
}
