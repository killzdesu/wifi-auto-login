import foo from './foo.js';
import checkConnection from './checkConnection'

const CronJob = require('cron').CronJob;
const job = new CronJob(
  '* */15 * * * *',
  async () => await checkConnection(), 
  null,
);


export default async function () {
  console.log(foo);
  await checkConnection()
  job.start()
}
