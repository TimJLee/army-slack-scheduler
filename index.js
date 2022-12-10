const Slack = require('slack-node');
const schedule = require('node-schedule');
require('dotenv').config();
const moment = require("moment");

const armyWebhookUrl = process.env.ARMY_WEBHOOK_URL;
const backendDailyWebhookUrl = process.env.BACKEND_DAILY_WEBHOOK_URL;

const armySlack = new Slack();
const backendDailySlack = new Slack();
armySlack.setWebhook(armyWebhookUrl);
backendDailySlack.setWebhook(backendDailyWebhookUrl);

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
                        value: "알수없음",
                        short: false
                    }
                ]
            }
        ]
    }, function (err, response) {
        console.log(response);
    });
}

const backendDailyWebhook = async (message) => {
    backendDailySlack.webhook({
        text: message,
        attachments: [
            {
                pretext: "지금 데일리 어떠신가요? :frog_ok:",
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

schedule.scheduleJob('0 30 10 * * *', function () {
    armyWebhook('우리는 자랑스러운 Creatrip army 입니다!');
});

schedule.scheduleJob('0 30 11 * * MON,FRI', function () {
    backendDailyWebhook('다들 출근하셨나요? :muscle:');
});