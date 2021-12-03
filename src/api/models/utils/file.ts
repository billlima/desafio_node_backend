export class FFile {
    constructor(
        public fieldname: string | null,
        public originalname: string | null,
        public encoding: string | null,
        public mimetype: string | null,
        public filename: string | null,
        public path: string,
        public size: number,  
    ){}
}