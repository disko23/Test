const user = require('./user.js');
const jsonSchema = require('../../modules/json-schema');

module.exports = {
    validateUser: async (req, res, next) => {
        try {
            await jsonSchema.validate(req.body, user);
            next();
        } catch (error) {
            next(error);
        }
    },
};
