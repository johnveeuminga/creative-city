import { DateTime } from "luxon"

export const toMedDate = (date: Date): string => {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_MED);
}
