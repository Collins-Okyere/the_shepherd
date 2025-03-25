import  Knex  from "knex"

const dbConfig = {
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "101647",
        database: "the_shepherd",
    },
    debug: true
}


export const DbSource = Knex(dbConfig)