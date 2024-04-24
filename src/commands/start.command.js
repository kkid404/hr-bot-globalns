const ruMessage = require('../lang/ru.json');
const { start } = require('../keyboards/start.keyboard');


module.exports = {
    command: 'start',
    description: 'Start command',
    action: async (ctx) => {

        await ctx.reply(ruMessage.message.start, start());
        // phone: ctx.from.phone_number || '',
    },
};