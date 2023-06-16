import dotenv from 'dotenv'
import assert from 'assert';
dotenv.config()
const { PORT , HOST, SQL_SERVER, SQL_USER, SQL_PWD, SQL_DB,HOST_URL} = process.env

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";
assert(PORT, "port is required")
assert(HOST, "host is required")

const config = {
    host: HOST,
    port: PORT,
    url : HOST_URL,
    sql: {
        server: SQL_SERVER,
        user: SQL_USER,
        database: SQL_DB,
        password: SQL_PWD,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true
        }
    }
}
export default config