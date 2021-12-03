import { cnpj, cpf } from "cpf-cnpj-validator";

export class ValidacaoUtils {

    static isEmpty = (value: any) => {
        return value == undefined || value == null || !value.toString().trim().length; 
    }

    static validarCep(value: any, validateEmpty = false) {
        if (ValidacaoUtils.isEmpty(value)) return !validateEmpty;

        return /^[0-9]{2}[0-9]{3}[0-9]{3}$/.test(value.toString());
    }

    static validarCpfCnpj(value: any, validateEmpty = false) {
        if (ValidacaoUtils.isEmpty(value)) return !validateEmpty;
        
        const v = value.toString(); 
        switch (v.length) {
            case 11:
                return cpf.isValid(v);    
            case 14:
                return cnpj.isValid(v);
            default:
                return false;
        }
    }
}