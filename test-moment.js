import moment from 'moment';

const ct = moment().clone();
const nt = moment()
  .hour(ct.hour() + 1)
  .minute(ct.minute() + 1);

const diff = nt.diff(ct, 'd');

console.log(`
Current     ${ct.toISOString()}
New         ${nt.toISOString()}

Comparison: ${diff >= parseInt(1)}
`);
