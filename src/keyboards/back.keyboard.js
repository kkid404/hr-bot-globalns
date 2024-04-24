const { Markup } = require('telegraf');
const ruMessage = require('../lang/ru.json');

function back() {
    return Markup.keyboard(ruMessage.keyboard.cancel).resize().oneTime();
}

module.exports = { back };