import { v4 as uuid } from 'uuid'

export default class User {
    constructor(_id, name, lastName, birthdate, email, socialMediaId, picture, credential) {
        this._id = _id != undefined || "" ? _id : uuid()
        this.name = name
        this.lastName = lastName
        this.birthdate = birthdate
        this.email = email
        this.socialMediaId = socialMediaId
        this.registered = false
        this.picture = picture
        this.interests = []
        this.bio = ''
        this.gymMemberships = []
        this.lastDayGym = new Date()
        this.gymAttendanceMonthly = 0
        this.monthlyGoalAttendance = 0
        this.weeklyGoalAttendance = 0
        this.gymAttendanceWeekly = 0
        this.credential = credential
        this.routine = []
    }
}