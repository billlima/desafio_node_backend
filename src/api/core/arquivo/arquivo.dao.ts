import { Arquivo } from "../../models/arquivo";
import { GenericDao } from "../utils/generic/generic.dao";

export class ArquivoDao extends GenericDao {

    constructor() {
        super('arquivo');
    }

    inserir = (arquivo: Arquivo, transaction: any = null) => {
        const sql = `
            INSERT INTO public.arquivo
            (data_hora_insercao, tamanho, mimetype, nome) VALUES
            (:dataHoraInsercao, :tamanho, :mimetype, :nome)`
        return this.insertWithReturnId(sql, arquivo, transaction);
    }

}