import { EnderecoService } from "../endereco-service";

describe('Endereco Service', () => {

    test('Integração busca por cep', async () => {
        jest.setTimeout(15000);
        const service = new EnderecoService();

        try {
            const endereco = await service.buscarCepApi('96840250');

            expect(endereco).not.toBeNull();
        } catch(e) {
            expect(false).toBeTruthy();
        }
    });
});