import { Router } from "express";
import PlanoAssinaturaService from "./plano-internet.service";

const service = new PlanoAssinaturaService();
const router = Router();

router.route('/combo')
    .get(service.combo);

export default router;