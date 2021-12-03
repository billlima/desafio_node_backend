import { CryptUtils } from "../crypt.utils";

describe('cryptUtils', () => {
    test('Deve gerar um hash', async () => {

        const res: string = await CryptUtils.hashString(`${new Date()}_test`);
        console.log('>>>', res);
        
        expect(res).not.toBeNull();
    });
});