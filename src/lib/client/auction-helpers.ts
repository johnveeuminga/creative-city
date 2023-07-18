import { DateTime } from "luxon";

export function checkIfAuctionIsOngoing(startDate: Date, endDate: Date) {
  const startDateParsed = DateTime.fromJSDate(startDate)
  const endDateParsed = DateTime.fromJSDate(endDate)
  const now = DateTime.now()

  return now >= startDateParsed && now < endDateParsed
}

export function checkIfAuctionHasEnded(startDate: Date, endDate: Date) {
  const startDateParsed = DateTime.fromJSDate(startDate)
  const endDateParsed = DateTime.fromJSDate(endDate)
  const now = DateTime.now()

  return now >= startDateParsed && now > endDateParsed
}