const Express = require('express');
const bodyParser = require('body-parser');
const log = require('./modules/logger')(module);
const router = require('./router');

const app = new Express();
app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    log.info(`Request for ${req.path} with method ${req.method}`);
    next();
});

app.use(router);

app.use((error, req, res, next) => {
    log.error(error);
    res.status(500).send({data: null, success: false, message: error.message || error});
});

module.exports = app;
