import { Router } from "express";
import webRouter from "./api/routes";


const router = Router();

router.use('/api', webRouter);

export default router;