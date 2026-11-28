import React from "react";
import "./date-style-component.css";
import type { Item, ItemDetail } from "../../types/item-types";

export type DateStyle = {
  date: "date-standard" | "date-pad-start";
  month:
    | "month-standard"
    | "month-pad-start"
    | "month-cap-long"
    | "month-cap-short"
    | "month-upp-long"
    | "month-upp-short"
    | "month-low-long"
    | "month-low-short";
  year: "full-year" | "partial-year";
  day:
    | "day-cap-long"
    | "day-cap-short"
    | "day-upp-long"
    | "day-upp-short"
    | "day-low-long"
    | "day-low-short";
};

type DateKey = keyof typeof dateTypes;

type DateStyleComponentProps = {
  selectedItems: ItemDetail;
  dateStyles: DateStyle;
  onChangeStyle: React.Dispatch<React.SetStateAction<DateStyle>>;
  onChangeFormat: React.Dispatch<React.SetStateAction<ItemDetail>>;
};

const dateTypes = {
  date: [
    { value: "date-standard", label: "1" },
    { value: "date-pad-start", label: "01" },
  ],
  month: [
    { value: "month-standard", label: "2" },
    { value: "month-pad-start", label: "02" },
    { value: "month-cap-long", label: "February" },
    { value: "month-cap-short", label: "Feb" },
    { value: "month-upp-long", label: "FEBRUARY" },
    { value: "month-upp-short", label: "FEB" },
    { value: "month-low-long", label: "february" },
    { value: "month-low-short", label: "feb" },
  ],
  year: [
    { value: "full-year", label: "2026" },
    { value: "partial-year", label: "26" },
  ],
  day: [
    { value: "day-cap-long", label: "Sunday" },
    { value: "day-cap-short", label: "Sun" },
    { value: "day-upp-long", label: "SUNDAY" },
    { value: "day-upp-short", label: "SUMN" },
    { value: "day-low-long", label: "sunday" },
    { value: "day-low-short", label: "sun" },
  ],
};

const DateStyleComponent = ({
  selectedItems,
  dateStyles,
  onChangeStyle,
  onChangeFormat,
}: DateStyleComponentProps) => {
  const filteredItems = Object.values(selectedItems).filter(
    (item): item is Item & { name: DateKey } =>
      item.selected && item.name in dateTypes,
  );
  return (
    <div className="date-style">
      <div className="date-style__groups">
        <small className="date-style__note">
          *Options are based on the date: 1 Feb 2026, Sunday
        </small>
        {filteredItems &&
          filteredItems.length > 0 &&
          filteredItems.map((item, index) => (
            <fieldset key={index} className="date-style__group">
              <legend className="date-style__legend">
                Choose a {item.name} style
              </legend>
              <div className="date-style__options">
                {dateTypes[item.name].map((dt, idx) => (
                  <label key={idx} className="date-style__option">
                    <input
                      type="radio"
                      name={`date-style-${item.name}`}
                      value={dt.value}
                      checked={item.format === dt.value}
                      onChange={(e) =>
                        // onChangeStyle(
                        //   (prev: DateStyle) =>
                        //     ({
                        //       ...prev,
                        //       [item.name]: e.target.value,
                        //     }) as DateStyle,
                        // )
                        onChangeFormat((prev: ItemDetail) => ({
                          ...prev,
                          [item.name]: {
                            ...prev[item.name],
                            format: e.target.value,
                          },
                        }))
                      }
                    />
                    {dt.label}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

        {/* <fieldset className="date-style__group">
          <legend className="date-style__legend">Choose a date style</legend>
          <div className="date-style__options">
            {dateTypes.date.map((dt, idx) => (
              <label key={idx} className="date-style__option">
                <input
                  type="radio"
                  name="date-style-date"
                  value={dt.value}
                  checked={dateStyles.date === dt.value}
                  onChange={(e) =>
                    onChangeStyle((prev: DateStyle) => ({
                      ...prev,
                      date: e.target.value as DateStyle["date"],
                    }))
                  }
                />
                {dt.label}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="date-style__group">
          <legend className="date-style__legend">Choose month style</legend>
          <div className="date-style__options">
            {dateTypes.month.map((dt, idx) => (
              <label key={idx} className="date-style__option">
                <input
                  type="radio"
                  name="date-style-month"
                  value={dt.value}
                  checked={dateStyles.month === dt.value}
                  onChange={(e) =>
                    onChangeStyle((prev: DateStyle) => ({
                      ...prev,
                      month: e.target.value as DateStyle["month"],
                    }))
                  }
                />
                {dt.label}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="date-style__group">
          <legend className="date-style__legend">Choose year style</legend>
          <div className="date-style__options">
            {dateTypes.year.map((dt, idx) => (
              <label key={idx} className="date-style__option">
                <input
                  type="radio"
                  name="date-style-year"
                  value={dt.value}
                  checked={dateStyles.year === dt.value}
                  onChange={(e) =>
                    onChangeStyle((prev: DateStyle) => ({
                      ...prev,
                      year: e.target.value as DateStyle["year"],
                    }))
                  }
                />
                {dt.label}
              </label>
            ))}
          </div>
        </fieldset> */}
      </div>
    </div>
  );
};

export default DateStyleComponent;
