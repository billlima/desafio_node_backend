import { AuthService } from "./auth.service";
const router = require('express').Router();

const service = new AuthService();

router.route('/').post(service.auth());

export default router;