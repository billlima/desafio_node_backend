import { Controller } from "../../../core/controller";
import { Lead } from "../../../models/lead";
import { LeadService } from "../lead.service";

describe('Lead Service', () => {

    const perfectObject = () => new Lead(
        1, 1, 'Cliente1', 'Endereço1', '96840250', '40877001006', null 
    )

    test('Teste campos obrigatórios', async () => {
        expect.assertions(5);
        
        const msgExpected = Controller.getMessage('err_required_fields');
        const service = new LeadService();

        let object = perfectObject();
        object.nome = null;
        expect(await service.validarDadosInsercaoAtualizacao(object))
            .toEqual(msgExpected);

        object = perfectObject();
        object.idPlanoInternet = null;
        expect(await service.validarDadosInsercaoAtualizacao(object))
            .toEqual(msgExpected);

        object = perfectObject();
        object.endereco = null;
        expect(await service.validarDadosInsercaoAtualizacao(object))
            .toEqual(msgExpected);

        object = perfectObject();
        object.cep = null;
        expect(await service.validarDadosInsercaoAtualizacao(object))
            .toEqual(msgExpected);
        
        object = perfectObject();
        object.cpf = null;
        expect(await service.validarDadosInsercaoAtualizacao(object))
            .toEqual(msgExpected);
    });

    test('Teste CEP Inváido', async () => {
        expect.assertions(2);
        
        const msgExpected = Controller.getMessage('err_invalid', ['Cep']);
        const service = new LeadService();

        let object = perfectObject();
        object.cep = '942311232';
        expect(await service.validarDadosInsercaoAtualizacao(object))
            .toEqual(msgExpected);

        object = perfectObject();
        object.cep = '942s1123';
        expect(await service.validarDadosInsercaoAtualizacao(object))
            .toEqual(msgExpected);
    });

    test('Teste CPF Inváido', async () => {
        expect.assertions(2);
        
        const msgExpected = Controller.getMessage('err_invalid', ['Cpf']);
        const service = new LeadService();

        let object = perfectObject();
        object.cpf = '12345678123';
        expect(await service.validarDadosInsercaoAtualizacao(object))
            .toEqual(msgExpected);

        object = perfectObject();
        object.cpf = '40877001008';
        expect(await service.validarDadosInsercaoAtualizacao(object))
            .toEqual(msgExpected);
    });
});