import { Controller } from "../../core/controller";
import { ValidacaoUtils } from "../../core/utils/validacao.utils";
import { Lead } from "../../models/lead";
import { LeadDao } from "./lead.dao";

export class LeadService {

    private dao = new LeadDao();

    buscarTodos = async (req: any, res: any) => {
        const lista = await this.dao.buscarTodos();
        await Controller.gerarRetorno(res, true, lista);
    }

    buscarPorId = async (req: any, res: any) => {
        const object: Lead = await this.dao.findById(req.params.id);
        
        if (object == null) {
            return Controller.gerarRetornoErro(res, Controller.getMessage('err_not_found'));
        }

        Controller.gerarRetorno(res, true, object);      
    }

    inserir = async (req: any, res: any) => {
        const body: Lead = req.body;
        
        if (!this.validarDadosInsercaoAtualizacao(body, res)) return;
        
        const object = new Lead(
            null,
            body.idPlanoInternet,
            body.nome, 
            body.endereco,
            body.cep,
            body.cpf,
            null
        );

        const id = await this.dao.inserir(object, null);

        Controller.gerarRetorno(res, true, {id: id});
    }

    atualizar = async (req: any, res: any) => {
        const body: Lead = req.body;
        
        if (!this.validarDadosInsercaoAtualizacao(body, res)) return;
        
        const object: Lead = await this.dao.findById(req.params.id);
        if (object == null) {
            return Controller.gerarRetornoErro(res, Controller.getMessage('err_not_found'));
        }
        
        object.idPlanoInternet = body.idPlanoInternet;
        object.nome = body.nome; 
        object.endereco = body.endereco;
        object.cep = body.cep;
        object.cpf = body.cpf;

        await this.dao.atualizar(object, null);
        
        Controller.gerarRetorno(res, true, Controller.getMessage('succ_save'));
    }

    remover = async (req: any, res: any) => {
        const object: Lead = await this.dao.findById(req.params.id);
        if (object == null) {
            return Controller.gerarRetornoErro(res, Controller.getMessage('err_not_found'));
        }
        
        await this.dao.delete(object.idLead!, null);
        Controller.gerarRetorno(res, true, Controller.getMessage('succ_delete'));
    }

    atualizarFoto = async (req: any, res: any) => {
        const object: Lead = await this.dao.findById(req.params.id);
        if (object == null) {
            return Controller.gerarRetornoErro(res, Controller.getMessage('err_not_found'));
        }
        
        object.idFoto = req.params.idFoto;
        
        await this.dao.atualizarFoto(object, null);
        
        Controller.gerarRetorno(res, true, Controller.getMessage('succ_save'));
    }


    // ##################################################################################################################
    // utils

    private validarDadosInsercaoAtualizacao = async (object: Lead, res: any) => {
        if (!object.idPlanoInternet || !object.nome || !object.endereco ||
            !object.cpf || !object.cep) {
            return Controller.gerarRetornoErro(res, Controller.getMessage('err_required_fields'));
        }
        
        if (!ValidacaoUtils.validarCep(object.cep)) {
            return Controller.gerarRetornoErro(res, Controller.getMessage('err_invalid', ['cep']));
        }

        if (!ValidacaoUtils.validarCep(object.cpf)) {
            return Controller.gerarRetornoErro(res, Controller.getMessage('err_invalid', ['cpf']));
        }

        if (!await this.dao.isUnique('cpf', object.cpf, object.idLead)) {
            return Controller.gerarRetornoErro(res, Controller.getMessage('err_unique', ['cpf']));
        } 

        return true;
    }
}