import React from "react";
import "./date-style-component.css";

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
};

type DateStyleComponentProps = {
  dateStyles: DateStyle;
  onChangeStyle: React.Dispatch<React.SetStateAction<DateStyle>>;
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
};

const DateStyleComponent = ({
  dateStyles,
  onChangeStyle,
}: DateStyleComponentProps) => {
  return (
    <div className="date-style">
      <div className="date-style__groups">
        <p className="date-style__note">
          *Options are based on the date: 1 Feb 2026
        </p>
        <fieldset className="date-style__group">
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
        </fieldset>
      </div>
    </div>
  );
};

export default DateStyleComponent;
