import { Controller } from "../../core/controller";
import { PlanoInternetDao } from "./plano-internet.dao";

export default class PlanoInternetService {
    
    private dao = new PlanoInternetDao();

    combo = async (_req: any, res: any) => {
        const lista = await this.dao.combo('nome');
        Controller.gerarRetorno(res, true, lista);
    }
    
}