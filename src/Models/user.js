import { v4 as uuid } from "uuid";

export default class User {
  constructor(_id, email, credential) {
    this._id = _id != undefined || "" ? _id : uuid();
    this.name = "";
    this.lastName = "";
    this.birthdate = "";
    this.email = email;
    this.registered = false;
    this.picture = "";
    this.interests = [];
    this.bio = "";
    this.gymMemberships = [];
    this.lastDayGym = new Date();
    this.gymAttendanceMonthly = 0;
    this.monthlyGoalAttendance = 0;
    this.weeklyGoalAttendance = 0;
    this.gymAttendanceWeekly = 0;
    this.credential = credential;
  }
}
