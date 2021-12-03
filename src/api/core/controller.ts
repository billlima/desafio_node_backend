import * as msg from "./constants/message.constants";

export class Controller {

    static async gerarRetorno(res: any, status: boolean, data: any = null, msg: string | null = null) {
        const httpCode = status ? 200 : 500;
        res.status(httpCode).send({ status: status, data: data, msg: msg });
        return status;
    }

    static gerarRetornoErro(res: any, msg: string | null = null) {
        msg = msg || Controller.getMessage("err");
        Controller.gerarRetorno(res, false, null, msg);
        return false;
    }

    static getMessage = (code: string, params: any[] = []):string => {
        let message = msg.get(code); 
        for (let x=0; x<params.length; x++) {
            message = message.replace(`{${x}}`, params[x]);
        }
        return message;
    }
    
}