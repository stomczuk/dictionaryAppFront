export class ChallengeTime {

  private _hour: number;
  private _minute: number;
  private _second: number;
  private _millisecond: number;

  constructor(hour: number, minute: number, second: number, millisecond: number) {
    this._hour = hour;
    this._minute = minute;
    this._second = second;
    this._millisecond = millisecond;
  }

  get hour(): number {
    return this._hour;
  }

  set hour(value: number) {
    this._hour = value;
  }

  get minute(): number {
    return this._minute;
  }

  set minute(value: number) {
    this._minute = value;
  }

  get second(): number {
    return this._second;
  }

  set second(value: number) {
    this._second = value;
  }

  get millisecond(): number {
    return this._millisecond;
  }

  set millisecond(value: number) {
    this._millisecond = value;
  }
}
