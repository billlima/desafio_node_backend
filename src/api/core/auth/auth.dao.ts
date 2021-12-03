import { GenericDao } from "../utils/generic/generic.dao";

export class AuthDao extends GenericDao {
    
    constructor() {
        super('usuario');
    }

    auth(login: string): any {
        const sql = `
            SELECT *
            FROM usuario u
            WHERE u.login = :login 
        `;

        return this.findOne(sql, {login: login});
    }
}