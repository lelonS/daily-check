// A static class to read and write data to the local storage
// This class is used to store the user's data in the local storage
// The data is stored in the form of a JSON object

export class Data {

  static currentData = [];

  // Read the data from the local storage. The data is a list of success days in the format: YYYY-MM-DD
  static read() {
    let data = localStorage.getItem('data');
    if (data) {
      this.currentData = JSON.parse(data);
      return this.currentData;
    } else {
      this.currentData = [];
      return [];
    }
  }

  // Write the data to the local storage
  static write(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }
}