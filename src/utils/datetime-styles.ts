import type { DateStyle } from "../components/DateStyleComponent/DateStyleComponent";
import type { TimeStyle } from "../components/TimeStyleComponent/TimeStyleComponent";
import type { OutputItem } from "../types/item-types";

type DateTypes = "date" | "month" | "year";
export function getDateStyles(date: Date, style: DateStyle, type: DateTypes) {
  //    year
  if (type === "year" && style.year === "full-year") {
    return date?.getFullYear().toString();
  }
  if (type === "year" && style.year === "partial-year") {
    return date?.getFullYear().toString().slice(-2);
  }

  // date
  if (type === "date" && style.date === "date-standard") {
    return date?.getDate().toString();
  }
  if (type === "date" && style.date === "date-pad-start") {
    return date?.getDate().toString().padStart(2, "0");
  }

  // month
  if (type === "month" && style.month === "month-standard") {
    return date?.toLocaleString("en-US", { month: "numeric" });
  }
  if (type === "month" && style.month === "month-pad-start") {
    return date?.toLocaleString("en-US", { month: "2-digit" });
  }
  if (type === "month" && style.month === "month-cap-long") {
    return date?.toLocaleString("en-US", { month: "long" });
  }
  if (type === "month" && style.month === "month-upp-long") {
    return date?.toLocaleString("en-US", { month: "long" }).toLocaleUpperCase();
  }
  if (type === "month" && style.month === "month-low-long") {
    return date?.toLocaleString("en-US", { month: "long" }).toLocaleLowerCase();
  }
  if (type === "month" && style.month === "month-cap-short") {
    return date?.toLocaleString("en-US", { month: "short" });
  }
  if (type === "month" && style.month === "month-upp-short") {
    return date
      ?.toLocaleString("en-US", { month: "short" })
      .toLocaleUpperCase();
  }
  if (type === "month" && style.month === "month-low-short") {
    return date
      ?.toLocaleString("en-US", { month: "short" })
      .toLocaleLowerCase();
  }

  return "";
}

export function getTimeStyles(date: Date, style: TimeStyle) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let dayPeriod = hour >= 12 ? "PM" : "AM";

  // time style default to 24hrs (pad start on both hour and minute, no ampm)
  let defaultStyleTimeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

  // time format: 12hr or 24hr
  if (style.format === "12hr") {
    dayPeriod = style.ampm === "low" ? dayPeriod.toLowerCase() : dayPeriod;

    hour = hour % 12 || 12;

    const hourStr =
      style.hour === "h-pad-start"
        ? hour.toString().padStart(2, "0")
        : hour.toString();
    const minuteStr =
      style.minute === "m-pad-start"
        ? minute.toString().padStart(2, "0")
        : minute.toString();

    // if (style.minute === "m-na") return `${hourStr} ${dayPeriod}`;,,,,,,,,,

    return `${hourStr}:${minuteStr} ${dayPeriod}`;
  }

  return defaultStyleTimeString;
}

export function addDateTimeInfo(dateTime: Date, items: OutputItem[]) {
  let newItems: OutputItem[] = [];

  for (const item of items) {
    newItems.push({
      ...item,
      value: item.type === "datetime" ? getValue(dateTime, item) : item.value,
    });
  }
  return newItems;
}

function getValue(dateTime: Date, item: OutputItem) {
  switch (item.name) {
    case "day":
      return getDayWithStyle(dateTime, item);
    case "date":
      return getDateWithStyle(dateTime, item);
    case "month":
      return getMonthWithStyle(dateTime, item);
    case "year":
      return getYearWithStyle(dateTime, item);
    case "hour":
      return getHourWithStyle(dateTime, item);
    case "minute":
      return getMinuteWithStyle(dateTime, item);
    case "timeZone":
      return item.value;
    default:
      return dateTime.getDate().toLocaleString();
  }
}

function getDayWithStyle(dateTime: Date, item: OutputItem) {
  console.log(item);
  if (
    !item.format ||
    item.format === "" ||
    item.format === undefined ||
    item.format == null
  ) {
    console.log("flag 1");
    return item.value;
  }
  switch (item.format) {
    case "day-cap-long":
      return dateTime.toLocaleDateString("en-US", { weekday: "long" });
    case "day-upp-long":
      return dateTime
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLocaleUpperCase();
    case "day-low-long":
      return dateTime
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLocaleLowerCase();
    case "day-cap-short":
      return dateTime.toLocaleDateString("en-US", { weekday: "short" });
    case "day-upp-short":
      return dateTime
        .toLocaleDateString("en-US", { weekday: "short" })
        .toLocaleUpperCase();
    case "day-low-short":
      return dateTime
        .toLocaleDateString("en-US", { weekday: "short" })
        .toLocaleLowerCase();
    default:
      return dateTime.toLocaleDateString("en-US", { weekday: "long" });
  }
}

function getDateWithStyle(dateTime: Date, item: OutputItem) {
  let value = dateTime.getDate().toLocaleString();

  if (
    !item.format ||
    item.format === "" ||
    item.format === undefined ||
    item.format == null
  ) {
    return value;
  }

  if (item.format === "date-pad-start") {
    value = value.padStart(2, "0");
  }

  return value;
}

function getMonthWithStyle(dateTime: Date, item: OutputItem) {
  if (
    !item.format ||
    item.format === "" ||
    item.format === undefined ||
    item.format == null
  ) {
    return item.value;
  }
  switch (item.format) {
    case "month-standard":
      return dateTime.getMonth().toLocaleString();
    case "month-pad-start":
      return dateTime.getMonth().toLocaleString().padStart(2, "0");
    case "day-cap-long":
      return dateTime.toLocaleDateString("en-US", { month: "long" });
    case "day-upp-long":
      return dateTime
        .toLocaleDateString("en-US", { month: "long" })
        .toLocaleUpperCase();
    case "day-low-long":
      return dateTime
        .toLocaleDateString("en-US", { month: "long" })
        .toLocaleLowerCase();
    case "day-cap-short":
      return dateTime.toLocaleDateString("en-US", { month: "short" });
    case "day-upp-short":
      return dateTime
        .toLocaleDateString("en-US", { month: "short" })
        .toLocaleUpperCase();
    case "day-low-short":
      return dateTime
        .toLocaleDateString("en-US", { month: "short" })
        .toLocaleLowerCase();
    default:
      return dateTime.toLocaleDateString("en-US", { month: "long" });
  }
}

function getYearWithStyle(dateTime: Date, item: OutputItem) {
  let value = dateTime.getFullYear().toLocaleString().replace(",", "");

  if (
    !item.format ||
    item.format === "" ||
    item.format === undefined ||
    item.format == null
  ) {
    return value;
  }

  if (item.format === "partial-year") {
    value = value.slice(2);
  }

  return value;
}
function getHourWithStyle(dateTime: Date, item: OutputItem) {
  let value = dateTime.getHours().toLocaleString();

  if (
    !item.format ||
    item.format === "" ||
    item.format === undefined ||
    item.format == null
  ) {
    return value;
  }

  if (item.format === "h-pad-start") {
    value = value.padStart(2, "0");
  }

  return value;
}
function getMinuteWithStyle(dateTime: Date, item: OutputItem) {
  let value = dateTime.getMinutes().toLocaleString();

  if (
    !item.format ||
    item.format === "" ||
    item.format === undefined ||
    item.format == null
  ) {
    return value;
  }

  if (item.format === "m-pad-start") {
    value = value.padStart(2, "0");
  }

  return value;
}
