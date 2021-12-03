import bodyParser from 'body-parser';
import express from 'express';
import { Controller } from './api/core/controller';
import { ValidacaoUtils } from './api/core/utils/validacao.utils';
import router from "./routes";
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(router);

app.use(rotaNaoEncontrada);
app.use(errorHandler);

function rotaNaoEncontrada(_req: any, _res: any, next: any) {
    console.error('>>> Rota não encontrada');
    next();
}

function errorHandler(error: any, _req: any, res: any, _next: any) { 
    console.error('Error Handler', error);

    let errorString = typeof error == 'string' ? error.toString() : Controller.getMessage('err'); 
    errorString = ValidacaoUtils.isEmpty(errorString) ? Controller.getMessage('err') : errorString;
    
    res.status(500);
    Controller.gerarRetornoErro(res, errorString);
}

export { app };
