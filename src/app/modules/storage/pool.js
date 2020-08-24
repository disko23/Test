const mysql = require('promise-mysql');
const fs = require('fs');
const log = require('../../../app/modules/logger')(module);

/**
 * connection with DB
 */
class Pool {
    /**
     * constructor
     * @param {Object} opts options to connection
     */
    constructor(opts) {
        this.opts = this._getOptions(opts);

        this.pool = mysql.createPool(this.opts);
        log.info(`Create pool connection to host ${opts.host}`);
    }

    /**
     * update ssl options to connections
     * @param {Object} opts options to connection
     * @returns {Object} updated options to connection
     */
    _getOptions(opts) {
        if (!opts.ssl) {
            return {
                ...opts,
                queryFormat: this._queryFormat,
            };
        }

        const ssl = {
            ca: fs.readFileSync(`${__dirname}/ssl/storage-ca.crt`),
        };

        return {
            ...opts,
            ssl,
            queryFormat: this._queryFormat,
        };
    }

    /**
     * @param {String} query query
     * @param {Object} values params
     * @returns {String} query
     */
    _queryFormat(query, values) {
        if (!values) {
            return query;
        }

        const permutation = function permutation(txt, key) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                return this.escape(values[key]);
            }

            return txt;
        }.bind(mysql);

        return query.replace(/\:(\w+)/g, permutation);
    }

    /**
     * get connection from pool
     * @returns {Object} connection
     */
    async getConnection() {
        const connection = await this.pool.getConnection();

        return connection;
    }

    /**
     * request in DB
     * @param {String} queryText text query
     * @param {Object|Null} values params to query
     * @return {Array|Object} response from DB
     */
    async query(queryText, values) {
        let conn = null;
        try {
            conn = await this.getConnection();

            const response = await conn.query(queryText, values);
            return response;
        } catch (error) {
            log.error(`An error occurred while trying to query ${queryText}`);
            log.debug(JSON.stringify(values));
            log.error(error);
            throw new Error('database error');
        } finally {
            if (conn && conn.release) {
                conn.release();
            }
        }
    }
}

module.exports = Pool;
