import { v4 as uuid } from "uuid";

export default class Exercise {
  constructor(
    name,
    description,
    desiredReps,
    desiredSet,
    desiredWeight,
    restTime,
    routineId
  ) {
    this._id = uuid();
    this.name = name;
    this.description = description;
    this.desiredReps = desiredReps;
    this.actualReps = 0;
    this.desiredSet = desiredSet;
    this.actualSet = 0;
    this.desiredWeight = desiredWeight;
    this.actualWeight = 0.0;
    this.restTime = restTime;
    this.routineId = routineId;
    this.completed = false;
  }
}
