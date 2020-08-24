const Pool = require('./pool.js');
const {storage} = require('../../../app/modules/config');
const queries = require('./queries.js');

const dbGame = new Pool(storage.dbReplica);

module.exports = {
    getAllUsers: () => dbGame.query(queries.getAllUsers),

    getUser: params => dbGame.query(queries.getUser, params),
};
