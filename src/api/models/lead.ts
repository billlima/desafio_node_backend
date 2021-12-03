export class Lead {
    constructor(
        public idLead: number | null,
        public idPlanoInternet: number | null,
        public nome: string | null,
        public endereco: string | null,
        public cep: string | null,
        public cpf: string | null,
        public idFoto: number | null,
    ){}
}