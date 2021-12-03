const axios = require('axios');
import { Controller } from "../../core/controller";
import { ValidacaoUtils } from "../../core/utils/validacao.utils";

export class EnderecoService {

    buscarPorCep = async (req: any, res: any) => {
        const cep = req.params.cep;
        
        if(!ValidacaoUtils.validarCep(cep)) {
            return Controller.gerarRetornoErro(res, Controller.getMessage('err_invalid', ['Cep']));    
        }

        try {
            const endereco = await this.buscarCepApi(cep);
            Controller.gerarRetorno(res, true, endereco);
        } catch (e: any) {
            Controller.gerarRetornoErro(res, e.toString());
        }
    }

    buscarCepApi = (cep: string) => {
        let url = `https://viacep.com.br/ws/${cep}/json/`;

        return axios.get(url)
            .then((response: any) => response.data)
            .catch((err: any) => {
                console.log(err);
                throw('err');
            });
    }
}