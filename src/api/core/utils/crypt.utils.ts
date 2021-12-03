import { sha256 } from 'crypto-hash';
import { Usuario } from "../../models/usuario";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export class CryptUtils {
    
    static cryptPass = (pass: string) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(pass, salt);
    } 

    static comparePass = (pass: string, encryptedPass: string) => {
        return bcrypt.compareSync(pass.toString(), encryptedPass);
    }

    static gerarTokenUsuario = (usuario: Usuario) => {
        const token = jwt.sign({ idUsuario: usuario.idUsuario, date: new Date() }, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });
        return token;
    }

    static validarTokenUsuario(token: string, secret: string) {
        return jwt.verify(token, secret);
    }

    static hashString = (string: string): Promise<string> => sha256(string);

    static generateNewPassword(length = 14): {plain: string, crypt: string} {
        const pass = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, length);
        return {plain: pass, crypt: this.cryptPass(pass)};
    }

}