import { Router } from "express";
import { LeadService } from "./lead.service";

const service = new LeadService();
const router = Router();

router.route('/')
    .get(service.buscarTodos)
    .post(service.inserir);

router.route('/:id')
    .get(service.buscarPorId)
    .patch(service.atualizar)
    .delete(service.remover);

router.route('/:id/foto/:idFoto')
    .patch(service.atualizarFoto);
    
export default router;