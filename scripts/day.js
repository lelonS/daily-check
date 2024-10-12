export class Day {
  constructor(index, name, date, htmlColumn, htmlHeader, htmlContent) {
    this.isSuccess = false;
    this.index = index;
    this.name = name;
    this.date = date;
    this.dateString = date.toISOString().slice(0, 10); // YYYY-MM-DD

    this.htmlColumn = htmlColumn;
    this.htmlHeader = htmlHeader;
    this.htmlContent = htmlContent;
  }

  setHeaderToToday() {
    this.htmlHeader.classList.add('day-today');
  }

  setToFail() {
    this.isSuccess = false;
    this.htmlColumn.classList.add('day-fail');
    this.htmlHeader.classList.add('day-fail');
    this.htmlContent.classList.add('day-fail');
  }

  setToSuccess() {
    this.isSuccess = true;
    this.htmlColumn.classList.add('day-success');
    this.htmlHeader.classList.add('day-success');
    this.htmlContent.classList.add('day-success');
  }

  setToFuture() {
    this.htmlColumn.classList.add('day-future');
    this.htmlHeader.classList.add('day-future');
    this.htmlContent.classList.add('day-future');
  }

  setToNeutral() {
    this.isSuccess = false;
    this.htmlColumn.classList.remove('day-success');
    this.htmlHeader.classList.remove('day-success');
    this.htmlContent.classList.remove('day-success');
  }

  toggleSuccess() {
    if (this.isSuccess) {
      this.setToNeutral();
    } else {
      this.setToSuccess();
    }
  }

  createEventHandlers(dataSave) {
    this.htmlColumn.addEventListener('click', () => {
      this.toggleSuccess();
      dataSave();
    });
  }
}