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
                pretext: "자유의 몸이 되기까지 남은 시간",
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

schedule.scheduleJob('0 30 10 * * *', function () {
    send('우리는 자랑스러운 Creatrip army 입니다!');
});

function calculateDayLeftUntilFreedom(end) {
    const duration = moment.duration(moment(end).diff(moment(), 'days')) + 1;
    return 'D-' + duration;
}

send();