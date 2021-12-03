
import * as dotenv from 'dotenv';
import { DatabaseConfig } from '../../../config/database';
import { Usuario } from '../../models/usuario';
import { CryptUtils } from '../utils/crypt.utils';
import { ValidacaoUtils } from '../utils/validacao.utils';
dotenv.config();

export class CheckAuth {

    static AUTH_FAILED = 'Auth failed';

    static logado = async(_req: any, _res: any, _next: any) => {
        try {
            const decoded = CheckAuth.verificarToken(_req);
            _req.userData = await CheckAuth.getUsuario(decoded.idUsuario);
        } catch(e: any) {
            return CheckAuth.retornarNaoAutorizado(_res, e.toString());
        }
        _next();
    }

    static verificarToken = (_req: any) => {
        if (ValidacaoUtils.isEmpty(_req.headers.authorization)) {
            throw CheckAuth.AUTH_FAILED;
        }

        const token = _req.headers.authorization.split(" ")[1];
        let decoded;

        try {
            decoded = CryptUtils.validarTokenUsuario(token, <string> process.env.JWT_SECRET_KEY);
        } catch (e: any) {
            throw CheckAuth.AUTH_FAILED;
        }
        
        return decoded
    }

    
    private static getUsuario = async (idUsuario: number): Promise<Usuario> => {
        const u = await DatabaseConfig.findOne(`
            SELECT * FROM usuario WHERE id_usuario = :id
        `, {id: idUsuario}, null);

        if (u == null) throw CheckAuth.AUTH_FAILED;

        u.senha = null;
        
        return u;
    }

    static retornarNaoAutorizado = (res: any, string: string) => {
        return res.status(401).send({
            status: false,
            msg: string
        });
    }
}