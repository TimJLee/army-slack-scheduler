const Slack = require('slack-node');
const schedule = require('node-schedule');
require('dotenv').config();
const moment = require("moment");

const armyWebhookUrl = process.env.ARMY_WEBHOOK_URL;
const bobDailyWebhookUrl = process.env.BOB_DAILY_WEBHOOK_URL;

const armySlack = new Slack();
const backendDailySlack = new Slack();
armySlack.setWebhook(armyWebhookUrl);
backendDailySlack.setWebhook(bobDailyWebhookUrl);

const armyWebhook = async (message) => {
    armySlack.webhook({
        text: message,
        attachments: [
            {
                pretext: "자유의 몸이 되기까지 남은 시간 :rocket:",
                color: "#00ff2a",
                fields: [
                    {
                        title: "이재용",
                        value: calculateDayLeftUntilFreedom('2023-01-25'),
                        short: false
                    },
                    {
                        title: "김정현",
                        value: calculateDayLeftUntilFreedom('2023-11-14'),
                        short: false
                    }
                ]
            }
        ]
    }, function (err, response) {
        console.log(response);
    });
}

const bobDailyWebhook = async (message) => {
    backendDailySlack.webhook({
        text: message,
        attachments: [
            {
                pretext: "한식? 일식? 중식? 라멘? 배달?",
            }
        ]
    }, function (err, response) {
        console.log(response);
    });
}

function calculateDayLeftUntilFreedom(end) {
    const duration = moment.duration(moment(end).diff(moment(), 'days')) + 1;
    return 'D-' + duration;
}

schedule.scheduleJob('0 0 14 * * *', function () {
    armyWebhook('우리는 자랑스러운 Creatrip army 입니다!');
});

schedule.scheduleJob('0 0 11 * * MON,FRI', function () {
    bobDailyWebhook('다들 점심 뭐드십니까 :funny_dog:');
});