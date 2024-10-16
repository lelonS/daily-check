import { Week } from './week.js';
import { Data } from './data.js';

const data = Data.read();
const week = new Week();

week.setupToday(onTodayClick);
week.setDays(data);

function onTodayClick() {
  const todayString = week.today.dateString;
  if (week.today.isSuccess && !data.includes(todayString)) {
    data.push(todayString);
  } else if (!week.today.isSuccess && data.includes(todayString)) {
    const index = data.indexOf(todayString);
    data.splice(index, 1);
  }
  Data.write(data);
}

window.week = week;