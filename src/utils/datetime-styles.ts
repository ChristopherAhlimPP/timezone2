import type { DateStyle } from "../components/DateStyleComponent/DateStyleComponent";
import type { TimeStyle } from "../components/TimeStyleComponent/TimeStyleComponent";

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

    if (style.minute === "m-na") return `${hourStr} ${dayPeriod}`;

    return `${hourStr}:${minuteStr} ${dayPeriod}`;
  }

  return defaultStyleTimeString;
}
