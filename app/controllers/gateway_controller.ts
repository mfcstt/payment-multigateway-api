import { LucidGatewayRepository } from "#infrastructure/repositories/lucid_gateway_repository";
import { ToggleGatewayUseCase } from "#use_cases/gateway/toggle_gateway_use_case";
import { UpdatePriorityUseCase } from "#use_cases/gateway/update_priority_use_case";
import type { HttpContext } from "@adonisjs/core/http";

const lucidGatewayRepository = new LucidGatewayRepository()
const toggleGatewayUseCase = new ToggleGatewayUseCase(lucidGatewayRepository)
const updatePriorityUseCase = new UpdatePriorityUseCase(lucidGatewayRepository)

export default class GatewayController {
  
  public async toggle({ response, params}: HttpContext){
    const id = Number(params.id)

    const gateway = await toggleGatewayUseCase.execute(id)

    return response.ok(gateway)
}

  public async updatePriority({response, params }: HttpContext){
    const id = Number(params.id)
    const priority = Number(params.priority)

    const gateway = await updatePriorityUseCase.execute(id, priority)

    return response.ok(gateway)

  }
}