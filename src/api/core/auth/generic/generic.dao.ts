import Recase from "better-recase";
import { DatabaseConfig } from "../../../../config/database";
import { QueryOptions } from "../../../models/utils/query-options";

class GenericDao {

    public tabela: string;

    public constructor(tabela: string) {
        this.tabela = tabela;
    }

    
    combo = (columnDescription: any = 'descricao') => {
        const sql = `
        SELECT 
        id_${this.tabela} AS id, id_${this.tabela}, ${columnDescription} as descricao
        FROM ${this.tabela}
        ORDER BY ${columnDescription}
        `;
        return DatabaseConfig.findAll(sql, {}, null);
    }
    
    protected addOnScript = (preText: string, value: any) => {
        if (value !== undefined && value != null) {
            return `${preText} ${value}`;
        }
        return '';
    }
    
    protected insertWithReturnId(sql: string, values: any, _transaction: any = null) {
        return DatabaseConfig.insertWithReturn(sql, values, 'id_'+this.tabela, _transaction);
    }

    protected insertWithReturn(sql: string, values: any, columnReturn: string, _transaction: any = null) {
        return DatabaseConfig.insertWithReturn(sql, values, columnReturn, _transaction);
    }    

    findAll = (options: QueryOptions) => {
        options = options || {};

        const sql = `
        SELECT * 
        FROM ${this.tabela}
        ${this.addOnScript('ORDER BY', options.order)}
        ${this.addOnScript('LIMIT', options.limit)}`;

        return DatabaseConfig.findAll(sql, {}, null);
    }

    findById = (id: any) => {
        const sql = `
            SELECT * 
            FROM ${this.tabela}
            WHERE id_${this.tabela} = :id
        `;

        return DatabaseConfig.findOne(sql, {id: id}, null);
    }

    delete = (id: number, transaction: any) => {
        const sql = `
            DELETE  
            FROM ${this.tabela}
            WHERE id_${this.tabela} = :id`;

        return DatabaseConfig.query(sql, {id: id}, transaction);
    } 

    protected query = (sql: string, values: any, _transaction: any = null) => {
        return DatabaseConfig.query(sql, values, _transaction);
    }

    protected findOne = (sql: string, values: any, _transaction: any = null) => {
        return DatabaseConfig.findOne(sql, values, _transaction);
    }

    protected queryFindAll = (sql: string, values: any = {}, _transaction: any = null) => {
        return DatabaseConfig.findAll(sql, values, _transaction);
    }

    isUnique = async(column: string, value: string, id: number | null = null) => {
        const whereId = id == null ? "" : `AND id_${this.tabela} != ${id}`;
        const sql = `
            SELECT * 
            FROM ${this.tabela}
            WHERE ${column} = :value
            ${whereId}`;

        return !(await DatabaseConfig.findAll(sql, {"value": value}, null)).length;
    }

    protected updateByObject(columns: string[], object: any, transaction:any = null) {
        let sql = `UPDATE ${this.tabela} SET `;
        
        columns.forEach(c => {
            sql += ` ${Recase.snakify(c)} = :${Recase.camelize(c)},`;
        });
        sql = sql.substr(0, sql.length-1);
        sql += ` WHERE id_${this.tabela} = :${Recase.camelize('id_'+this.tabela)}`;
        
        return this.query(sql, object, transaction);
    }

    begin() {
        return DatabaseConfig.begin();
    }

    commit(status: boolean, transaction: any) {
        return DatabaseConfig.commit(status, transaction);
    }
}

export { GenericDao };
