const router = require('express').Router(); // eslint-disable-line new-cap
const schemas = require('./schemas');
const middlewares = require('./middlewares.js');

router
    .route('/user')
    .get(middlewares.getAllUsers)
    .post(
        schemas.validateUser,
        middlewares.setUser,
    )
    .all(middlewares.notAllowed);

router
    .route('/user/:userId')
    .get(middlewares.getUser)
    .all(middlewares.notAllowed);

module.exports = router;
