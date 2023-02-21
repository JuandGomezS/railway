
import * as dotenv from 'dotenv'
import queryLogger from '../utils/queryLogger.js'
dotenv.config()

export const options = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    debug: true,
    log: {
        warn(message) {
            const query = interpolateData(message);
            queryLogger.warn(query);
        },
        error(message) {
            const query = interpolateData(message);
            queryLogger.warn(query);
        },
        deprecate(message) {
            const query = interpolateData(message);
            queryLogger.debug(query);
        },
        debug(message) {
            const query = interpolateData(message);
            queryLogger.debug(query);
        }
    }
}

function interpolateData(message) {
    if (!['insert', 'update'].includes(message.method)) {
        return message.sql
    }

    return {
        sql: message.sql,
        bindings: message.bindings
    }
}
