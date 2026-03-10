import { LucidGatewayRepository } from '#infrastructure/repositories/lucid_gateway_repository'
import { LucidPurchaseRepository as LucidTransactionRepository } from '#infrastructure/repositories/lucid_purchase_repository'
import { LucidClientRepository } from '#infrastructure/repositories/lucid_client_repository'
import { LucidProductRepository } from '#infrastructure/repositories/lucid_product_repository'
import ProcessPurchaseUseCase from './purchase/process_purchase_use_case.js'
import ListAllPurchasesUseCase from './purchase/list_all_purchases_use_case.ts'
import PurchaseDetailUseCase from './purchase/purchase_detail_use_case.ts'

const gatewayRepository = new LucidGatewayRepository()
const transactionRepository = new LucidTransactionRepository()
const clientRepository = new LucidClientRepository()
const productRepository = new LucidProductRepository()

export const processPurchaseUseCase = new ProcessPurchaseUseCase(
  gatewayRepository,
  transactionRepository,
  clientRepository,
  productRepository
)

export const listAllPurchasesUseCase = new ListAllPurchasesUseCase(transactionRepository)

export const purchaseDetailUseCase = new PurchaseDetailUseCase(transactionRepository)
