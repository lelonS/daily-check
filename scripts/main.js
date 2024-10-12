import { Week } from './week.js';
import { Data } from './data.js';

const data = Data.read();
const week = new Week();

week.setupToday(onTodayClick);
week.setPastDays(data);

function onTodayClick() {
  const successDays = week.getSuccessDays();
  Data.write(successDays);
}

window.week = week;