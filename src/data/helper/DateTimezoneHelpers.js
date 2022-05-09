import dateFormat from "dateformat";

export const getLogDateString = (timestamp) =>
  dateFormat(
    new Date(parseInt(timestamp)).toISOString(),
    "yyyy-mm-dd"
  );

export const getDateStringWithTimeAndZone = (timestamp) =>
  dateFormat(
    new Date(parseInt(timestamp)).toISOString(),
    "dd/mm/yyyy h:MM TT Z"
  );
export const getDateStringFromString = (timestamp) =>
  dateFormat(new Date(parseInt(timestamp)), "mmm d, yyyy");

export const getDateString = (timestamp) =>
  dateFormat(timestamp, "mmm d, yyyy");

export const getFullDateString = (timestamp) =>
  dateFormat(timestamp, "mmmm d, yyyy");

export const getDateStringWithTimeAndCustomTimezone = (timestamp, zone) =>
  dateFormat(timestamp, "mmmm d, yyyy h:MM TT") + " " + (zone || "");

const getDateStringWithTimeAndDefaultTimezone = (timestamp) =>
  dateFormat(
    new Date(parseInt(timestamp)).toISOString(),
    "mmmm d, yyyy h:MM TT Z",
  );

export const getShortDateWithTimeString = (timestamp) =>
  dateFormat(
    new Date(parseInt(timestamp)).toISOString(),
    "mmm d, yyyy h:MM TT Z",
  );

export const getDateWithTimeString = (timestamp, zone) =>
  zone
    ? getDateStringWithTimeAndCustomTimezone(timestamp, zone)
    : getDateStringWithTimeAndDefaultTimezone(timestamp);