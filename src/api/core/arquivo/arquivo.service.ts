import fs from 'fs';
import { Arquivo } from '../../models/arquivo';
import { FFile } from '../../models/utils/file';
import { Controller, Controller as ctrl } from "../controller";
import { DateUtils } from '../utils/date.utils';
import { ValidacaoUtils } from '../utils/validacao.utils';
import { ArquivoDao } from './arquivo.dao';

export class ArquivoService {

    private dao = new ArquivoDao();

    upload = async (req: any, res: any) => {
        const file: FFile = req.file;

        if (ValidacaoUtils.isEmpty(file)) {
            return Controller.gerarRetornoErro(res);
        }

        if (this.toMb(file.size) >= 5) {
            fs.unlinkSync(file.path);
            return ctrl.gerarRetornoErro(res, Controller.getMessage('err_file_max_size', ['5MB']));
        }

        const arquivo = <Arquivo>{};
        arquivo.originalName = file.originalname,
        arquivo.mimetype = file.mimetype,
        arquivo.size = file.size,
        arquivo.dataHoraInsercao = DateUtils.toFormatDB();

        const idArquivo: number = await this.dao.inserir(arquivo);

        ctrl.gerarRetorno(res, true, {idArquivo: idArquivo});
    }

    download = async (req: any, res: any) => {
        const arquivo: Arquivo = await this.dao.findById(req.params.id);
        
        try {
            console.log('falta algo'); //TODO
        } catch(e) {
            Controller.gerarRetornoErro(res, 'file_not_found');
        }
    }

    private toMb(size: number): number {
        return size * 0.000001;
    }
}