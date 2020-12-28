const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL

const webhook = new IncomingWebhook(url);

exports.sccNotify = async (event, context, callback) => {
  const message = JSON.parse(Buffer.from(event.data, 'base64').toString());

  // Send the notification
  await webhook.send({
    attachments: [
      {
        "fallback": "Required plain-text summary of the attachment.",
        "color": "#FF3300",
        "pretext": "GCP警察だ！",
        "title": message.resource.projectDisplayName,
        "title_link": message.finding.externalUri,
        "text": message.finding.sourceProperties.Recommendation,
        "fields": [
          {
            "title": "Explanation",
            "value": message.finding.sourceProperties.Explanation,
            "short": false
          },
          {
            "title": "Exception Instruction",
            "value": message.finding.sourceProperties.ExceptionInstructions,
            "short": false
          },
          {
            "title": "Severity",
            "value": message.finding.severity,
            "short": false
          }
        ]
      }
    ]
  });
  callback();
};
