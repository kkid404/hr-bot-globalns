const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const { back } = require('../keyboards/back.keyboard');
const { start } = require('../keyboards/start.keyboard');
const userService = require('../services/user.service');

const testTaskScene = new BaseScene('testTaskScene');

testTaskScene.enter(async (ctx) => {
    await ctx.reply(ruMessage.message.test_task, back());
});

testTaskScene.on('text', async (ctx) => {
    if (ctx.message.text == ruMessage.keyboard.cancel[0]) {
        
        await ctx.scene.enter('backScene')
        ctx.scene.leave();
        return
    } else {
        await ctx.reply('Пожалуйста, отправьте архивный файл в формате .zip', back());
    }
})

testTaskScene.on('document', async (ctx) => {
    const document = ctx.message.document;
    const id = ctx.from.id

    const user = await userService.getByTgIdUser(id)
    
    const caption = 
        'Имя: ' + user.name + '\n' +
        'Тг юзер: ' + user.username + '\n' +
        'Возраст: ' + user.age + '\n' +
        'Опыт ЯП: ' + user.experience + '\n' +
        'Опыт арбитража: ' + user.arbitrageExperience + '\n' +
        'Часы работы: ' + user.workTime + '\n' +
        'Телефон: ' + user.phone;
        'Локация: ' + user.location;


    if (user !== null) {
        // Проверяем тип документа, можете использовать другие типы файлов, если нужно
        if (document.mime_type === 'application/zip') {
            
            await ctx.reply('Архив принят. Спасибо!', start());
            
            await ctx.telegram.sendDocument(process.env.CHANNEL_ID, document.file_id, { caption });

            ctx.scene.leave();
        } else {
            await ctx.reply('Пожалуйста, отправьте архивный файл в формате .zip');
            // Можно предложить пользователю отправить архив еще раз или обработать иной сценарий
        }
    } else {
        await ctx.reply('Похоже, вы не оставили заявку перед сдачей тестового. Пожалуйста, оставьте заявку.', start())
        ctx.scene.leave();
    }
    
});


module.exports = testTaskScene;
