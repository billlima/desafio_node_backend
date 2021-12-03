import { Router } from "express";
import { CheckAuth } from "./core/auth/check-auth";

import leadRouter from './modules/lead/lead.controller';
import arquivoRouter from './core/arquivo/arquivo.controller';
import authRouter from './core/auth/auth.controller';
import planoInternetRouter from './modules/plano-internet/plano-internet.controller';
import enderecoRouter from './modules/endereco/endereco-controller';

const router = Router();

router.use('/core/auth', authRouter);
router.use('/core/arquivo', CheckAuth.logado, arquivoRouter);

router.use('/endereco', CheckAuth.logado, enderecoRouter);
router.use('/plano-internet', CheckAuth.logado, planoInternetRouter);
router.use('/lead', CheckAuth.logado, leadRouter);

export default router;