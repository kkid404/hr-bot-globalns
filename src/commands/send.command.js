const ruMessage = require('../lang/ru.json');
const { start } = require('../keyboards/start.keyboard');


module.exports = {
    command: 'send',
    description: 'Command to send a message via bot',
    action: async (ctx) => {
        if(ctx.from.id == process.env.ADMIN_ID) {
            await ctx.scene.enter('sendMessageScene')
        } else {
            await ctx.reply(ruMessage.message.protected_error)
        }
        
    },
};