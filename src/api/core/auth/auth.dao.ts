import { GenericDao } from "./generic/generic.dao";

export class AuthDao extends GenericDao {
    
    constructor() {
        super('usuario');
    }

    auth(email: string): any {
        const sql = `
            SELECT *
            FROM usuario u
            WHERE u.email = :email 
        `;

        return this.findOne(sql, {email: email});
    }
}