export class FFile {
    constructor(
        public fieldname: string,
        public originalname: string,
        public encoding: string,
        public mimetype: string,
        public filename: string,
        public destination: string,
        public path: string,
        public size: number,  
    ){}
}