import { Usuario } from "../../../models/usuario";
import { CryptUtils } from "../../utils/crypt.utils";
import { CheckAuth } from "../check-auth";

describe('CheckAuth', () => {

    const generateHeader = (token: string) => {
        return {'headers': {'authorization': 'Bearer '+token}};
    }

    const objectUsuario = () => new Usuario(1, 'teste', 'teste', null);    

    test('Gerar e validar token', () => {
        const usuario = objectUsuario();    
        
        try {
            const token = CryptUtils.gerarTokenUsuario(usuario);
            CheckAuth.verificarToken(generateHeader(token));
            expect(true).toBeTruthy();
        } catch (e: any) {
            expect(e.toString()).not.toEqual(CheckAuth.AUTH_FAILED);        
        }
    });

    test('Gerar e validar token inválido', () => {
        const usuario = objectUsuario();    
        
        try {
            const token = 'teste' + CryptUtils.gerarTokenUsuario(usuario);
            CheckAuth.verificarToken(generateHeader(token));
            expect(false).toBeTruthy();
        } catch (e: any) {
            expect(e.toString()).toEqual(CheckAuth.AUTH_FAILED);        
        }
    });
});