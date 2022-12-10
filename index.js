const Slack = require('slack-node');
const schedule = require('node-schedule');  // 스케줄러 모듈 사용
require('dotenv').config();
const moment = require("moment");

const webhookUrl = process.env.WEBHOOK_URL;

const slack = new Slack();
slack.setWebhook(webhookUrl);

const send = async (message) => {
    slack.webhook({
        text: message,
        attachments: [
            {
                pretext: "creatrip army",
                color: "#00FFFF",
                fields: [
                    {
                        title: "이재용",
                        value: calculateDayLeftUntilFreedom('2023-01-25'),
                        short: false
                    },
                    {
                        title: "김정현",
                        value: "미안해요 정현님.. 원치 않으면 삭제 해줄게요",
                        short: false
                    }
                ]
            }
        ]
    }, function (err, response) {
        console.log(response);
    });
}

schedule.scheduleJob('0 30 10 * * *', function () {
    send('전역일 계산기');
});

function calculateDayLeftUntilFreedom(end) {
    const duration = moment.duration(moment(end).diff(moment(), 'days')) + 1;
    return 'D-' + duration;
}

send();