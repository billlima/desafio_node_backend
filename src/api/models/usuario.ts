export class Usuario {
    constructor(
        public idUsuario: number | null,
        public nome: string | null,
        public login: string | null,
        public senha: string | null
    ){}
}