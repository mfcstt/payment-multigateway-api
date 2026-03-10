import { LucidClientRepository } from '#infrastructure/repositories/lucid_client_repository'
import { LucidPurchaseRepository } from '#infrastructure/repositories/lucid_purchase_repository'
import { ListClientsUseCase } from './clients/list_clients_use_cases.js'
import { PurchaseByClientUseCase } from './clients/purchase_by_client_use_case.js'

const clientRepository = new LucidClientRepository()
const transactionRepository = new LucidPurchaseRepository()

export const listClientsUseCase = new ListClientsUseCase(clientRepository)
export const getClientPurchasesUseCase = new PurchaseByClientUseCase(
  clientRepository,
  transactionRepository
)
