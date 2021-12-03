export class Arquivo {
    constructor(
        public idArquivo: number | null,
        public nome: string | null,
        public mimetype: string | null,
        public tamanho: number,  
        public dataHoraInsercao: Date | string
    ){}
}