import { Client } from '@upstash/qstash';

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export async function enqueueBackgroundJob(endpoint: string, body: any) {
  return qstash.publishJSON({
    url: endpoint,
    body,
    timeout: '1m',
  });
}
