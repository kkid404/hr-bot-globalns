const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const { back } = require('../keyboards/back.keyboard');
const { start } = require('../keyboards/start.keyboard');
const userService = require('../services/user.service');

const sendMessageScene = new BaseScene('sendMessageScene');

sendMessageScene.enter(async (ctx) => {
    ctx.session.step = 1;
    await ctx.reply(ruMessage.message.set_id, back());
});

sendMessageScene.on('text', async (ctx) => {
    
    const step = ctx.session.step;

    if (ctx.message.text == ruMessage.keyboard.cancel[0]) {
        await ctx.scene.enter('backScene')
        ctx.scene.leave();
        return
    }

    switch (step) {
        case 1:
            ctx.session.id = ctx.message.text;
            await ctx.reply(ruMessage.message.set_text, back());
            break;
        case 2:
            ctx.session.message = ctx.message.text;
            try{
                const user = await userService.getByUsernameUser(ctx.session.id)
                const userId = user.tg_id
                await ctx.telegram.sendMessage(userId, ctx.session.message)
                await ctx.reply(ruMessage.message.messages_succes, start())
            } catch (error) {
                console.log(error)
                await ctx.reply(ruMessage.message.message_error, start())
            }
            ctx.scene.leave();
            break;
        }
    ctx.session.step++;

})


module.exports = sendMessageScene;
