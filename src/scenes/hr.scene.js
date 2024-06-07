const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');

const HRScene = new BaseScene('HRScene');

HRScene.enter(async (ctx) => {
    ctx.session.step = 1;

    await ctx.reply(ruMessage.message.start);
    await ctx.reply(ruMessage.message.name);
});

HRScene.on('text', async (ctx) => {
    const step = ctx.session.step;

    switch (step) {
        case 1:
            ctx.session.name = ctx.message.text;
            await ctx.reply(ruMessage.message.age);
            break;
        case 2:
            ctx.session.age = ctx.message.text;
            await ctx.reply(ruMessage.message.from);
            break;
        case 3:
            ctx.session.location = ctx.message.text;
            await ctx.reply(ruMessage.message.experience);
            break;
        case 4:
            ctx.session.experience = ctx.message.text;
            await ctx.reply(ruMessage.message.workTime);
            break;
        case 5:
            ctx.session.workTime = ctx.message.text;
            await ctx.sendMessage(ruMessage.message.watchVideo);
            await ctx.sendMessage(ruMessage.message.exampleWork);
            await ctx.sendMessage(ruMessage.message.contact);
            break;
        case 6:
            try{
                ctx.session.phone = ctx.message.text;

                await ctx.sendMessage(ruMessage.message.thanks);
               
                const caption = 
                'Имя: ' + ctx.session.name + '\n' +
                'Возраст: ' + ctx.session.age + '\n' +
                'Место проживания: ' + ctx.session.location + '\n' +
                'Опыт работы ' + ctx.session.experience + '\n' +
                'Рабочие часы: ' + ctx.session.workTime + '\n' +
                'Контактная информация: ' + ctx.session.phone;

                await ctx.telegram.sendMessage(process.env.CHANNEL_ID, caption)

            } catch(error) {
                await ctx.reply(ruMessage.message.error);
                console.log(error)
            }
            ctx.scene.leave();
            break;
        default:
            await ctx.reply(ruMessage.message.error);
            ctx.scene.leave();
            break;
    }

    ctx.session.step++;
});

module.exports = HRScene;