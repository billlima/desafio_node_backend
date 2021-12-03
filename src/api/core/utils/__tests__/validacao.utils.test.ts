import { ValidacaoUtils } from "../validacao.utils";

describe('Validacao Utils', () => {

    test('isEmpty', async () => {
        expect.assertions(5);
        
        expect(ValidacaoUtils.isEmpty('')).toBeTruthy();
        expect(ValidacaoUtils.isEmpty(null)).toBeTruthy();
        expect(ValidacaoUtils.isEmpty([])).toBeTruthy();

        expect(ValidacaoUtils.isEmpty('teste')).toBeFalsy();
        expect(ValidacaoUtils.isEmpty(['teste'])).toBeFalsy();
    });

    test('validarCep', async () => {
        expect.assertions(7);
        
        expect(ValidacaoUtils.validarCep('96840250')).toBeTruthy();
        expect(ValidacaoUtils.validarCep('00000000')).toBeTruthy();
        expect(ValidacaoUtils.validarCep(null)).toBeTruthy();

        expect(ValidacaoUtils.validarCep('aaa')).toBeFalsy();
        expect(ValidacaoUtils.validarCep('aaaaaaaa')).toBeFalsy();
        expect(ValidacaoUtils.validarCep('00000b00')).toBeFalsy();
        expect(ValidacaoUtils.validarCep(null, true)).toBeFalsy();
    });

    test('validarCpfCnpj', async () => {
        expect.assertions(8);
        
        expect(ValidacaoUtils.validarCpfCnpj('60402659066')).toBeTruthy();
        expect(ValidacaoUtils.validarCpfCnpj('28897800076')).toBeTruthy();
        expect(ValidacaoUtils.validarCpfCnpj('88735053000100')).toBeTruthy();
        expect(ValidacaoUtils.validarCpfCnpj('92305733000152')).toBeTruthy();
        expect(ValidacaoUtils.validarCpfCnpj(null)).toBeTruthy();

        expect(ValidacaoUtils.validarCpfCnpj('60402659166')).toBeFalsy();
        expect(ValidacaoUtils.validarCpfCnpj('88734053000100')).toBeFalsy();
        expect(ValidacaoUtils.validarCpfCnpj(null, true)).toBeFalsy();
    });
});