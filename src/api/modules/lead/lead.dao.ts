import { GenericDao } from "../../core/utils/generic/generic.dao";
import { Lead } from "../../models/lead";
import { QueryOptions } from "../../models/utils/query-options";

export class LeadDao extends GenericDao {

    constructor() {
        super('lead');
    }

    buscarTodos = () => {
        return this.findAll(new QueryOptions("nome ASC", null));
    }

    inserir = (lead: Lead, transaction: any) => {
        return this.insertWithReturnId(
            `INSERT INTO lead 
                (id_plano_internet, nome, endereco, cep, cpf) VALUES
                (idPlanoInternet, nome, endereco, cep, cpf)`, 
            lead, 
            transaction
        );
    }

    atualizar = (lead: Lead, transaction: any) => {
        return this.updateByObject(
            ['id_plano_internet', 'nome', 'endereco', 'cep', 'cpf'],
            lead,
            transaction
        );
    }

    excluir = (id: number, transaction: any) => {
        return this.delete(id, transaction);
    }

    atualizarFoto = (lead: Lead, transaction: any) => {
        return this.updateByObject(
            ['id_foto'],
            lead,
            transaction
        );
    }

}