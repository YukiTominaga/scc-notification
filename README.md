gcloud beta functions deploy sccNotify --runtime=nodejs12 --region=asia-northeast1 --trigger-topic=scc-notification --set-env-vars=SLACK_WEBHOOK_URL=<YOUR_SLACK_WEBHOOK_URL> --project=<YOUR_PROJECT_ID>