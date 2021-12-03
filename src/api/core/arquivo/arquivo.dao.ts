import { Arquivo } from "../../models/arquivo";
import { GenericDao } from "../auth/generic/generic.dao";

export class ArquivoDao extends GenericDao {

    constructor() {
        super('arquivo');
    }

    inserir = (arquivo: Arquivo, transaction: any = null) => {
        const sql = `
            INSERT INTO public.arquivo
            (data_hora_insercao, size, mimetype, original_name) VALUES
            (:dataHoraInsercao, :size, :mimetype, :originalName)`
        return this.insertWithReturnId(sql, arquivo, transaction);
    }

}