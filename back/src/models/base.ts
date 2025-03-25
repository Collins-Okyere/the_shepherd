import { Knex } from "knex";
import { Model, ModelOptions, QueryContext } from "objection";
import { DbSource } from "src/config/db.config";

export class BaseModel extends Model {

    id: number;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;

    $beforeInsert(queryContext: QueryContext): void | Promise<any> {
        this.created_at = new Date()
        this.updated_at = new Date()
    }

    $beforeUpdate(opt: ModelOptions, queryContext: QueryContext): void | Promise<any> {
        this.updated_at = new Date()
    }

    static knex(knex?: Knex): Knex {
        return DbSource
    }
    
}