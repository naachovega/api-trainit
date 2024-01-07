import { v4 as uuid } from "uuid";

export default class Routine {
  constructor(name, description, userId, dateString, day, month, year) {
    this.id = uuid();
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.dateString = dateString;
    this.day = day;
    this.month = month;
    this.year = year;
    this.exercises = []; //this will be an array of exercises
  }
}
