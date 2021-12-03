import { Usuario } from '../../models/usuario';
import { Controller } from '../controller';
import { CryptUtils } from '../utils/crypt.utils';
import { AuthDao } from './auth.dao';

export class AuthService {

    private _dao = new AuthDao();

    auth = () => async (req: any, res: any, _next: any) => {
        try {
            let usuario: Usuario = await this._dao.auth(req.body.login); 
            
            if (usuario != null) {
                const hashSenha = await CryptUtils.comparePass(req.body.senha, usuario.senha!);
                
                if (hashSenha) {
                    usuario.senha = null;
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