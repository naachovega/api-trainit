import { v4 as uuid } from "uuid";

export default class Exercise {
  constructor(name, description, desiredReps, desiredWeight, routineId) {
    this._id = uuid();
    this.name = name;
    this.description = description;
    this.desiredReps = desiredReps;
    this.actualReps = 0.0;
    this.desiredWeight = desiredWeight;
    this.routineId = routineId;
    this.actualWeight = 0.0;
    this.completed = false;
  }
}
