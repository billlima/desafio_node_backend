import { Usuario } from '../../models/usuario';
import { Controller } from '../controller';
import { CryptUtils } from '../utils/crypt.utils';
import { AuthDao } from './auth.dao';

export class AuthService {

    private _dao = new AuthDao();

    auth = () => async (req: any, res: any, _next: any) => {
        try {
            const usuario: Usuario = await this._dao.auth(req.body.email); 
            
            if (usuario != null) {
                const hashSenha = CryptUtils.comparePass(req.body.senha, usuario.senha!);
                
                if (hashSenha) {
                    return Controller.gerarRetorno(res, true, 
                        {token: CryptUtils.gerarTokenUsuario(usuario), usuario: usuario});
                } 
            }

            Controller.gerarRetornoErro(res, Controller.getMessage('err_wrong_user_pass'));
            
        } catch (e) {
            Controller.gerarRetornoErro(res);
        }
    }

}