import type { ClientRepositoryInterface } from "#domain/client/client_repository_interface";

export class ListClientsUseCase {
  constructor(private clientRepository: ClientRepositoryInterface) {}
  async execute() {
      return this.clientRepository.list();
  }
}