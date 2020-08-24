const Pool = require('./pool.js');
const {storage} = require('../../../app/modules/config');
const queries = require('./queries.js');

const dbMaster = new Pool(storage.dbMaster);

module.exports = {
    setUser: async params => {
        await dbMaster.query(queries.setUser, params);
        const [{userId}] = await dbMaster.query(queries.getLastUserId);
        return userId;
    },
};
