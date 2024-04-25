const NANOS_PER_MILLI = 1_000_000;
const MILLIS_PER_SEC = 1_000;

export class Duration {
  static new(secs: number, nanos: number) {
    return secs * 1000 + nanos / NANOS_PER_MILLI;
  }

  static fromSecs(secs: number) {
    return MILLIS_PER_SEC * secs;
  }

  static fromMins(mins: number) {
    return (MILLIS_PER_SEC * 60) * mins;
  }

  static fromHours(hours: number) {
    return (MILLIS_PER_SEC * 60) * 60 * hours;
  }

  static fromDays(days: number) {
    return (MILLIS_PER_SEC * 60) * 60 * 24 * days;
  }
}
