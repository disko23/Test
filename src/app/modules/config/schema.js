const jst = require('mobitel-json-schema-template');

// Config file schema
module.exports = {
    id: 'config',
    type: 'object',
    additionalProperties: false,
    required: [
        'name',
        'port',
        'log',
        'storage',
    ],
    properties: {
        name: jst.string().min(1).done(),
        port: jst.integer().min(1).done(),
        // Logger settings
        log: {
            type: 'object',
            additionalProperties: false,
            required: [
                'type',
                'filePath',
                'fileLevel',
                'consoleLevel',
            ],
            properties: {
                // Log type
                type: jst.string().enum(['console', 'file', 'both']).done(),
                // Path to log file
                filePath: jst.string().done(),
                // Log level for log in file
                fileLevel: jst.string().enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly']).done(),
                // Log level for log in console
                consoleLevel: jst.string().enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly']).done(),
            },
        },
        // Connections to storage
        storage: {
            type: 'object',
            required: [
                'dbMaster',
                'dbReplica',
            ],
            properties: {
                dbMaster: {
                    type: 'object',
                    required: [
                        'host',
                        'port',
                        'database',
                        'user',
                        'password',
                    ],
                    properties: {
                        // DB host
                        host: jst.string().anyOf(
                            [
                                jst.stringFormat('hostname'),
                                jst.stringFormat('ipv4'),
                            ]).done(),
                        // DB port
                        port: jst.integer().min(1).done(),
                        // DB name
                        database: jst.string().done(),
                        // DB user
                        user: jst.string().done(),
                        // DB user password
                        password: jst.string().done(),
                        // DB pool connection count
                        connectionLimit: jst.integer().min(1).done(),
                        // DB pool connection count
                        connectTimeout: jst.integer().min(100).done(),
                    },
                },
                dbReplica: {
                    type: 'object',
                    required: [
                        'host',
                        'port',
                        'database',
                        'user',
                        'password',
                    ],
                    properties: {
                        // DB host
                        host: jst.string().anyOf(
                            [
                                jst.stringFormat('hostname'),
                                jst.stringFormat('ipv4'),
                            ]).done(),
                        // DB port
                        port: jst.integer().min(1).done(),
                        // DB name
                        database: jst.string().done(),
                        // DB user
                        user: jst.string().done(),
                        // DB user password
                        password: jst.string().done(),
                        // DB pool connection count
                        connectionLimit: jst.integer().min(1).done(),
                        // DB pool connection count
                        connectTimeout: jst.integer().min(100).done(),
                    },
                },
            },
        },
    },
};
