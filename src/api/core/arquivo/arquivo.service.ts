import fs from 'fs';
import { Arquivo } from '../../models/arquivo';
import { FFile } from '../../models/utils/ffile';
import { Controller, Controller as ctrl } from "../controller";
import { DateUtils } from '../utils/date.utils';
import { ValidacaoUtils } from '../utils/validacao.utils';
import { ArquivoDao } from './arquivo.dao';

export class ArquivoService {

    private dao = new ArquivoDao();

    buscarPorId = async (id: number) => {
        return this.dao.findById(id);
    }

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
        arquivo.nome = file.originalname,
        arquivo.mimetype = file.mimetype,
        arquivo.tamanho = file.size,
        arquivo.dataHoraInsercao = DateUtils.toFormatDB();

        const idArquivo: number = await this.dao.inserir(arquivo);

        fs.renameSync(file.path, `${__dirname}/files/${idArquivo}.${this.getExtension(arquivo.nome)}`);

        ctrl.gerarRetorno(res, true, {idArquivo: idArquivo});
    }

    download = async (req: any, res: any) => {
        const arquivo: Arquivo = await this.dao.findById(req.params.id);
        try {
            const file = `${__dirname}/files/${arquivo.idArquivo}.${this.getExtension(arquivo.nome!)}`;
            res.download(file);
        } catch(e) {
            Controller.gerarRetornoErro(res, 'file_not_found');
        }
    }

    private getExtension(filename: string): string {
        let arr: string[] = filename.split('.');
        return arr[arr.length-1];
    }

    private toMb(size: number): number {
        return size * 0.000001;
    }
}