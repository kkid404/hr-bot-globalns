const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const { back } = require('../keyboards/back.keyboard');
const { start } = require('../keyboards/start.keyboard');
const userService = require('../services/user.service');

const HRScene = new BaseScene('HRScene');

HRScene.enter(async (ctx) => {
    ctx.session.step = 1;
    await ctx.reply(ruMessage.message.name, back());
});

HRScene.on('text', async (ctx) => {
    const step = ctx.session.step;

    if (ctx.message.text == ruMessage.keyboard.cancel[0]) {
        
        await ctx.scene.enter('backScene')
        ctx.scene.leave();
        return
    }

    switch (step) {
        case 1:
            ctx.session.name = ctx.message.text;
            await ctx.reply(ruMessage.message.age, back());
            break;
        case 2:
            ctx.session.age = ctx.message.text;
            await ctx.reply(ruMessage.message.from, back());
            break;
        case 3:
            ctx.session.location = ctx.message.text;
            await ctx.reply(ruMessage.message.experience, back());
            break;
        case 4:
            ctx.session.experience = ctx.message.text;
            await ctx.reply(ruMessage.message.workTime, back());
            break;
        case 5:
            ctx.session.workTime = ctx.message.text;
            await ctx.sendMessage(ruMessage.message.arbitrageExperience, back());
            break;
        case 6:
            ctx.session.arbitrageExperience = ctx.message.text;
            await ctx.sendMessage(ruMessage.message.watchVideo, back());
            await ctx.sendMessage(ruMessage.message.exampleWork);
            await ctx.sendMessage(ruMessage.message.contact, back());
            break;
        case 7:
            try{
                ctx.session.phone = ctx.message.text;
                let user = await userService.getByTgIdUser(ctx.from.id);
                if(!user) {
                    await userService.addUSer({
                        tg_id: ctx.from.id,
                        name: ctx.session.name || '',
                        phone : ctx.session.phone || '',
                        username: `@${ctx.from.username}` || '',
                        age: ctx.session.age || '',
                        location: ctx.session.location || '',
                        experience: ctx.session.experience || '',
                        workTime: ctx.session.workTime || '',
                        arbitrageExperience: ctx.session.arbitrageExperience || '',
                        location: ctx.session.location || '',
                    })
                    await ctx.sendMessage(ruMessage.message.thanks, start())

                    const caption = 
                    'Имя: ' + ctx.session.name + '\n' +
                    'Юзернейм: ' + `@${ctx.from.username}` + '\n' +
                    'Возраст: ' + ctx.session.age + '\n' +
                    'Место проживания: ' + ctx.session.location + '\n' +
                    'Опыт работы ' + ctx.session.experience + '\n' +
                    'Рабочие часы: ' + ctx.session.workTime + '\n' +
                    'Контактная информация: ' + ctx.session.phone;
                    
                    await ctx.telegram.sendMessage(process.env.CHANNEL_ID, caption)


                } else {
                    await ctx.sendMessage('Вы уже оставляли заявку.', start())
                    ctx.scene.leave();
                }

            } catch(error) {
                await ctx.reply(ruMessage.message.error, start());
                console.log(error)
            }
            ctx.scene.leave();
            break;
        default:
            await ctx.reply(ruMessage.message.error, start());
            ctx.scene.leave();
            break;
    }

    ctx.session.step++;
});

module.exports = HRScene;