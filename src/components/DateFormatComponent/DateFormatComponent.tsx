import React, { useState } from "react";
import "./date-format-component.css";

// type StringDateFormat = {
//   format: string;
//   separator: "/" | ":" | "." | "(space)";
// };
type DateFormatComponentProps = {
  format: string;
  onFormatChange: (value: string) => void;
  seperator: string;
  onSeperatorChange: (value: string) => void;
};

const DateFormatComponent = ({
  format,
  onFormatChange,
  seperator,
  onSeperatorChange,
}: DateFormatComponentProps) => {
  return (
    <div className="date-format-container">
      <div className="select-date-format">
        <label htmlFor="dateFormatDropdownWrapper">
          Select your date format
        </label>
        <div id="dateFormatDropdownWrapper" className="dropdown">
          <select
            name="dateFormatDropdown"
            id="dateFormatDropdown"
            value={format}
            onChange={(e) => onFormatChange(e.target.value)}
          >
            <option value="DD/MM/YYYY">Day / Month / Year</option>
            <option value="DD/YYYY/MM">Day / Year / Month</option>
            <option value="MM/DD/YY">Month / Day / Year</option>
            <option value="MM/YYYY/DD">Month / Year / Day</option>
            <option value="YYYY/DD/MM">Year / Day / Month</option>
            <option value="YYYY/MM/DD">Year / Month / Day</option>
          </select>
        </div>
      </div>
      <div className="select-seperator">
        <label htmlFor="dateFormatDropdownWrapper">Select your separator</label>
        <div id="dateFormatDropdownWrapper" className="dropdown">
          <select
            name="dateFormatDropdown"
            id="dateFormatDropdown"
            value={seperator}
            onChange={(e) => onSeperatorChange(e.target.value)}
          >
            <option value="/"> / </option>
            <option value=":"> : </option>
            <option value="."> . </option>
            <option value="(space)"> {"(space)"}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DateFormatComponent;
