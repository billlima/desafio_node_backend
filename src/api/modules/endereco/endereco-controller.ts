import { Router } from "express";
import { EnderecoService } from "./endereco-service";

const service = new EnderecoService();
const router = Router();

router.route('/cep/:cep')
    .get(service.buscarPorCep);

router.route('/cep-api/:cep')
    .get(service.buscarPorCepApi);
    
export default router;