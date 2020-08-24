const ZSchema = require('z-schema');
const readableError = require('mobitel-zschema-readable-error');

const isObject = variable => Object.prototype.toString.call(variable) === '[object Object]';

/** JSON schema workflow */
class JsonSchema {
    /** Class constructor */
    constructor() {
        this._CLASS = this.constructor.name.toString();

        /** @type {ZSchema} */
        this.validator = new ZSchema({
            noEmptyArrays: true,
            noEmptyStrings: true,
            noTypeless: true,
        });
    }

    /**
     * @param {Object} json JSON data for validation
     * @param {String} schema JSON-schema for validation
     * @returns {Promise} Resolve with validated data, reject with error
     */
    validate(json, schema) {
        const self = this;

        return new Promise((resolve, reject) => {
            if (isObject(schema)) {
                reject(`Incorrect JSON schema for validation`); // eslint-disable-line
            }

            if (isObject(json)) {
                reject(`Incorrect JSON data for validation`); // eslint-disable-line
            }

            self.validator.validate(json, schema, error => {
                if (error) {
                    const errorText = readableError(error);
                    return reject(errorText);
                }

                resolve(json);
            });
        });
    }

    /**
     * @param {Object} json JSON data for validation
     * @param {String} schema JSON-schema for validation
     * @returns {{success: boolean, error: (string|null)}} Object with validation result
     */
    validateSync(json, schema) {
        const self = this;

        if (isObject(schema)) {
            return {
                success: false,
                error: `Incorrect JSON schema for validation`,
            };
        }

        if (isObject(json)) {
            return {
                success: false,
                error: `Incorrect JSON data for validation`,
            };
        }

        if (!self.validator.validate(json, schema)) {
            const errors = self.validator.getLastErrors();
            const errorText = readableError(errors);
            return {
                success: false,
                error: errorText,
            };
        }

        return {
            success: true,
            error: null,
        };
    }
}

module.exports = new JsonSchema();
