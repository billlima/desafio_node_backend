export class Arquivo {
    constructor(
        public idArquivo: number | null,
        public idUsuario: number | null,
        public originalName: string | null,
        public mimetype: string | null,
        public size: number,  
        public dataHoraInsercao: Date | string
    ){}
}