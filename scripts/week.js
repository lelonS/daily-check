import { Day } from './day.js';

export class Week {
  constructor() {
    this.htmlColumns = document.querySelectorAll('.day-column');
    this.htmlDayHeaders = document.querySelectorAll('.day-header');
    this.htmlDayContent = document.querySelectorAll('.day-content');
    this.mondayDate = this.generateMondayDate();

    this.setUpDays();
    this.today = this.generateToday();
  }

  setUpDays() {
    this.monday = new Day(0, 'Monday', this.mondayDate, this.htmlColumns[0], this.htmlDayHeaders[0], this.htmlDayContent[0]);
    this.tuesday = new Day(1, 'Tuesday', this.generateOffsetDate(1), this.htmlColumns[1], this.htmlDayHeaders[1], this.htmlDayContent[1]);
    this.wednesday = new Day(2, 'Wednesday', this.generateOffsetDate(2), this.htmlColumns[2], this.htmlDayHeaders[2], this.htmlDayContent[2]);
    this.thursday = new Day(3, 'Thursday', this.generateOffsetDate(3), this.htmlColumns[3], this.htmlDayHeaders[3], this.htmlDayContent[3]);
    this.friday = new Day(4, 'Friday', this.generateOffsetDate(4), this.htmlColumns[4], this.htmlDayHeaders[4], this.htmlDayContent[4]);
    this.saturday = new Day(5, 'Saturday', this.generateOffsetDate(5), this.htmlColumns[5], this.htmlDayHeaders[5], this.htmlDayContent[5]);
    this.sunday = new Day(6, 'Sunday', this.generateOffsetDate(6), this.htmlColumns[6], this.htmlDayHeaders[6], this.htmlDayContent[6]);
    this.days = [this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday];
  }


  getDay(index) {
    return this.days[index];
  }

  generateMondayDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayDate = new Date(today);
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;  // If it's Sunday (0), move back 6 days, otherwise back to Monday.
    mondayDate.setDate(today.getDate() - diff);
    mondayDate.setHours(0, 0, 0, 0); // Ensure the Monday date is set to midnight
    return mondayDate;
  }

  generateOffsetDate(offset) {
    const date = new Date(this.mondayDate);
    date.setDate(date.getDate() + offset);
    return date;
  }

  generateToday() {
    const today = new Date();
    const day = today.getDay();
    const dayIndex = day === 0 ? 6 : day - 1; // If it's Sunday (0), move to the last day of the week
    return this.days[dayIndex];
  }

  setupToday(dataSave) {
    this.today.setHeaderToToday();
    this.today.createEventHandlers(dataSave);
  }

  getSuccessDays() {
    const successDays = [];
    for (const day of this.days) {
      if (day.isSuccess) {
        successDays.push(day.dateString);
      }
    }
    return successDays;
  }

  setDays(data) {
    // The data is a list of success days in the format: yyyy-mm-dd
    for (const day of this.days) {
      if (data.includes(day.dateString)) {
        day.setToSuccess();
      } else if (day.date < this.today.date) {
        // Past day that were not saved are considered failed
        day.setToFail();
      } else if (day.date > this.today.date) {
        // Future days
        day.setToFuture();
      }
    }
  }
}


