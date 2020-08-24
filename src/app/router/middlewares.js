const {dbMaster, dbReplica} = require('../modules/storage');
const log = require('../modules/logger')(module);

const response = {
    data: {},
    success: true,
    message: '',
};

module.exports = {
    // get all settings notifications
    getAllUsers: async (req, res, next) => {
        try {
            const users = await dbReplica.getAllUsers();
            res.send({...response, data: users, message: 'all users'});
        } catch (error) {
            next(error);
        }
    },

    // get settings notifications for hall id
    setUser: async (req, res, next) => {
        try {
            const userId = await dbMaster.setUser(req.body);
            res.send({...response, data: {userId}, message: `create new user with id ${userId}`});
        } catch (error) {
            next(error);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const userData = await dbReplica.getUser({userId});

            res.send({...response, data: userData, message: `data user - ${userId}`});
        } catch (error) {
            next(error);
        }
    },

    notAllowed: (req, res) => {
        log.warn(`Method ${req.method} not allowed for path '${req.originalUrl}'`);
        res.status(405).send({data: null, success: false, message: 'Method Not Allowed'});
    },
};
