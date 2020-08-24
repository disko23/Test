const jst = require('mobitel-json-schema-template');

module.exports = {
    id: 'setSettings',
    type: 'object',
    additionalProperties: false,
    required: [
        'name',
        'phone',
    ],
    properties: {
        hallId: jst.number().min(0).done(),
        phone: jst.string().min(11).done(),
    },
};
