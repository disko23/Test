/**
 * Компонент настроек приложения
 * @type {Config}
 */
module.exports = new class Config {
    /**
     * constructor
     */
    constructor() {
        // there's magic here
        this.init();
        return this.appConfig;
    }

    /**
     * Метод инициализации компонента
     * @async
     * @override
     * @this Config
     */
    init() {
        console.log('magic');
        this.appConfig = {
            name: 'test',
            port: 3000,
            log: {
                type: 'console',
                filePath: 'logs/log_service',
                fileLevel: 'silly',
                consoleLevel: 'silly',
            },
            storage: {
                dbMaster: {
                    host: 'localhost',
                    port: 3306,
                    database: 'db_users',
                    user: 'root',
                    password: 'password',
                    ssl: false,
                },
                dbReplica: {
                    host: 'localhost',
                    port: 3306,
                    database: 'db_users',
                    user: 'root',
                    password: 'password',
                    ssl: false,
                },
            },
        };
    }
}();
