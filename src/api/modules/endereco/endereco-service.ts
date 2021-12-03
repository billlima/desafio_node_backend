import * as https from 'https';
import { Controller } from "../../core/controller";
import { ValidacaoUtils } from "../../core/utils/validacao.utils";
import { Endereco } from "../../models/utils/endereco";

import CepPromise from 'cep-promise';

export class EnderecoService {

    buscarPorCep = async (req: any, res: any) => {
        const cep = req.params.cep;

        if(!ValidacaoUtils.validarCep(cep)) {
            return Controller.gerarRetornoErro(res, Controller.getMessage('err_invalid', ['cep']));    
        }

        const options = {
            method: "GET",
            hostname: "buscacepinter.correios.com.br",
            path: "/app/cep/carrega-cep.php?mensagem_alerta=&cep=" + cep + "&cepaux=",
            headers: {'Content-Type': 'application/json'}
        };
        
        try {
            const req = https.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`)
            
                res.on('data', data => {
                console.log(data)
                })
            })
            
            req.on('error', error => {
                Controller.gerarRetornoErro(res, error.message);
            })
            
            req.end()
        } catch {
            Controller.gerarRetornoErro(res);
        }
    }

    buscarPorCepApi = async (req: any, res: any) => {
        const cep = req.params.cep;
        
        if(!ValidacaoUtils.validarCep(cep)) {
            return Controller.gerarRetornoErro(res, Controller.getMessage('err_invalid', ['cep']));    
        }

        await CepPromise(cep).then(
            (response: any) => {
                console.log(response);
                const endereco = new Endereco(
                    response.street,
                    response.neighborhood,
                    response.city,
                    response.state
                );

                Controller.gerarRetorno(res, true, endereco);
            }
        ).catch(
            (error: any) => {
                console.error(error.errors);
                Controller.gerarRetornoErro(res, Controller.getMessage('err_not_found_generic', ['Cep']));
            }
        );
    }
}