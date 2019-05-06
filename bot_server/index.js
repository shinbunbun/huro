//'use strict';
const line = require('@line/bot-sdk');
const client = new line.Client({ channelAccessToken: process.env.ACCESSTOKEN });
const axios = require('axios');

exports.handler = function (event, context) {
    const events = JSON.parse(event.body).events;
    let message;
    events.forEach(async function (event) {
        console.log(event);
        switch (event.type) {
            case "message":
                message = await messageFunc(event);
                break;
            case "postback":
                break;
        }
        if (message != undefined) {
            console.log(message);
            client.replyMessage(event.replyToken, message)
                .then((response) => {
                    let lambdaResponse = {
                        statusCode: 200,
                        headers: { "X-Line-Status": "OK" },
                        body: '{"result":"completed"}'
                    };
                    context.succeed(lambdaResponse);
                }).catch((err) => console.log(`${JSON.stringify(message)}\n\n\n${err}`));
        }
    });
};

const messageFunc = async (e) => {
    let message;
    const userMessage = e.message.text;
    switch (userMessage) {
        case '風呂':
            const options = {
                method: 'post',
                baseURL: `wsサーバのアドレス`,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const main = async () => {
                let response;
                try {
                    const axires = await axios.request(options);
                    response = axires.data;
                }
                catch (error) {
                    response = error.response.data;
                }
                console.log(response);
            };
            await main();
            message = {
                "type": "text",
                "text": "成功しました"
            };
            break;
    }
    return message;
};
