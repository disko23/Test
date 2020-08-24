module.exports = {
    'api-name': {
        config: ['apiName'],
        type: 'string',
    },
    'api-version': {
        config: ['timeout'],
        type: 'string',
    },
    'port': {
        config: ['port'],
        type: 'number',
    },
    'log-type': {
        config: ['log', 'type'],
        type: 'string',
    },
    'log-filePath': {
        config: ['log', 'filePath'],
        type: 'string',
    },
    'log-fileLevel': {
        config: ['log', 'fileLevel'],
        type: 'string',
    },
    'log-consoleLevel': {
        config: ['log', 'consoleLevel'],
        type: 'string',
    },
    'db-host': {
        config: ['storage', 'host'],
        type: 'string',
    },
    'db-port': {
        config: ['storage', 'port'],
        type: 'integer',
    },
    'db-database': {
        config: ['storage', 'database'],
        type: 'string',
    },
    'db-user': {
        config: ['storage', 'user'],
        type: 'string',
    },
    'db-password': {
        config: ['storage', 'password'],
        type: 'string',
    },
};
