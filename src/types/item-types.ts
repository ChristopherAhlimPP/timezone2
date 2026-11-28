export type Item = {
  id: string;
  name: string;
  type: "seperator" | "datetime";
  selected: boolean;
  position: number;
  style: string;
  attr: string;
  format?: string;
  value: string;
};

export type OutputItem = Item & { uid: string };

export type ItemDetail = {
  date: Item;
  month: Item;
  year: Item;
  day: Item;
  hour: Item;
  minute: Item;
  timeZone: Item;
};

export const browserTimeZone = new Intl.DateTimeFormat()
  .resolvedOptions()
  .timeZone.replace("_", " ");

export const DEFAULT_ITEM: ItemDetail = {
  date: {
    id: "date",
    name: "date",
    type: "datetime",
    selected: true,
    position: 1,
    style: "",
    attr: "",
    format: "date-standard",
    value: "",
  },
  month: {
    id: "month",
    name: "month",
    type: "datetime",
    selected: true,
    position: 2,
    style: "",
    attr: "",
    format: "month-standard",
    value: "",
  },
  year: {
    id: "year",
    name: "year",
    type: "datetime",
    selected: true,
    position: 3,
    style: "",
    attr: "",
    format: "full-year",
    value: "",
  },
  day: {
    id: "day",
    name: "day",
    type: "datetime",
    selected: true,
    position: 4,
    style: "",
    attr: "",
    format: "day-upp-long",
    value: "",
  },
  hour: {
    id: "hour",
    name: "hour",
    type: "datetime",
    selected: true,
    position: 5,
    style: "",
    attr: "",
    format: "h-standard",
    value: "",
  },
  minute: {
    id: "minute",
    name: "minute",
    type: "datetime",
    selected: true,
    position: 6,
    style: "",
    attr: "",
    format: "m-standard",
    value: "",
  },
  timeZone: {
    id: "timeZone",
    name: "timeZone",
    type: "datetime",
    selected: true,
    position: 7,
    style: "",
    attr: "",
    value: browserTimeZone,
  },
};
