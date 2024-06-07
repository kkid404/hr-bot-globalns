const ruMessage = require('../lang/ru.json');


module.exports = {
    command: 'start',
    description: 'Start command',
    action: async (ctx) => {
        await ctx.scene.enter('HRScene')
    },
};