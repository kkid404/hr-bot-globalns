const ruMessage = require('../lang/ru.json');
const { start } = require('../keyboards/start.keyboard');

const adminIds = process.env.ADMIN_IDS.split(',').map(id => id.trim());



module.exports = {
    command: 'send',
    description: 'Command to send a message via bot',
    action: async (ctx) => {
        if(adminIds.includes(ctx.from.id.toString())) {
            await ctx.scene.enter('sendMessageScene')
        } else {
            await ctx.reply(ruMessage.message.protected_error)
        }
        
    },
};