import { LucidGatewayRepository } from "#infrastructure/repositories/lucid_gateway_repository";
import { ToggleGatewayUseCase } from "#use_cases/gateway/toggle_gateway_use_case";
import type { HttpContext } from "@adonisjs/core/http";

const lucidGatewayRepository = new LucidGatewayRepository()
const toggleGatewayUseCase = new ToggleGatewayUseCase(lucidGatewayRepository)

export default class GatewayController {
  
  // Toggle the active status of a payment gateway
  public async toggle({ response, params}: HttpContext){
    const id = Number(params.id)

    const gateway = await toggleGatewayUseCase.execute(id)

    return response.ok(gateway)
}
}