import { Router } from "express";
import { EnderecoService } from "./endereco-service";

const service = new EnderecoService();
const router = Router();

router.route('/cep/:cep')
    .get(service.buscarPorCep);
    
export default router;