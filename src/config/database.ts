import * as dotenv from 'dotenv';
import { Pool } from "pg";
import { pg as named } from "yesql";
const camelcaseKeysDeep = require('camelcase-keys-deep');

dotenv.config();


export class DatabaseConfig {

    static _printSql = process.env.PRINT_SQL == "false";

    private static config = {
        host:       process.env.PG_HOST,
        port:       Number.parseInt(<string> process.env.PG_PORT),
        database:   process.env.PG_DATABASE,
        user:       process.env.PG_USER,
        password:   process.env.PG_PASSWORD
    };
    
    static pool = new Pool(DatabaseConfig.config);

    static begin = async () => {

        try {
            const client = await DatabaseConfig.pool.connect();
            await client.query('BEGIN');
            return client;
        } catch(error: any) {
            console.log('Erro ao iniciar transação...');
            throw new Error(error);
        }
        
    }

    static commit = async (status: boolean, transaction: any) => {
    
        const client = transaction ? await transaction : {};
        
        try {
            await client.query(status ? 'COMMIT' : 'ROLLBACK');
            await client.release();
        } catch(error: any) {
            console.log('Erro ao finalizar transação...');
            throw Error(error);
        }
    }

    static query = async (sql: string, params: any, transaction: any) => {
        const client = transaction ? await transaction : await DatabaseConfig.pool.connect();
        
        try {
            const response = await client.query(DatabaseConfig._named(sql,params));
            return camelcaseKeysDeep(response);
        } finally {
            if(!transaction) {
                client.release();
            }
        }
        
    }
    
    static insertWithReturn = async (sql: string, params: any, columnReturn: string, transaction: any) => {
    
        const client = transaction ? await transaction : await DatabaseConfig.pool.connect();
    
        try {
            sql += ' RETURNING ' + columnReturn;
            const response = await client.query(DatabaseConfig._named(sql,params));
            return camelcaseKeysDeep(response.rows[0][columnReturn]);
        } finally {
            if(!transaction) {
                client.release();
            }
        }
        
    }
    
    static findAll = async (sql: string, params: any, transaction: any) => {
        const client = transaction ? await transaction : await DatabaseConfig.pool.connect();
        
        try {
            const response = await client.query(DatabaseConfig._named(sql,params));
            return camelcaseKeysDeep(response.rows);
        } finally {
            if(!transaction) {
                client.release();
            }
        }
        
    }
    
    static findOne = async (sql: string, params: any, transaction: any) => {
        const client = transaction ? await transaction : await DatabaseConfig.pool.connect();

        try {
            const response = await client.query(DatabaseConfig._named(sql,params));
            
            if (response.rows.length) {
                return camelcaseKeysDeep(response.rows[0]);
            }
            return null;
        } catch(error) {
            console.log('ERRO', error);
        } finally {
            if(!transaction) {
                client.release();
            }
        }
    }

    static _named = (sql:any, params: any) => {
        if (DatabaseConfig._printSql) {
            console.log(named(sql, {useNullForMissing: true})(params));
        }
        return named(sql, {useNullForMissing: true})(params);
    }
}