import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import { useEffect, useState } from "react";
import DateFormatComponent from "./components/DateFormatComponent/DateFormatComponent";
import CodeBlockComponent from "./components/CodeBlockComponent/CodeBlockComponent";
import DateStyleComponent, {
  type DateStyle,
} from "./components/DateStyleComponent/DateStyleComponent";
import Toggle from "./components/ToggleComponent/Toggle";
import { BiUnderline } from "react-icons/bi";
import TimeStyleComponent, {
  DEFAULT_TIMESTYLE,
  type TimeStyle,
} from "./components/TimeStyleComponent/TimeStyleComponent";
import { getDateStyles, getTimeStyles } from "./utils/datetime-styles";

type DateValue = Date;

// check out this later.
Intl;

function App() {
  const [dateType, setDateType] = useState<"single" | "range">("single");
  const [includeTime, setIncludeTime] = useState<boolean>(false);
  const [singleDateTime, setSingleDateTime] = useState<DateValue>(new Date());
  const [startDateTime, setStartDateTime] = useState<Date | null>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date | null>();
  const [codeString, setCodeString] = useState<string>("<div>11/11/2026</div>");

  const [selectedFormat, setSelectedFormat] = useState<string>("DD/MM/YYYY");
  const [selectedSeparator, setSelectedSeparator] = useState<string>("/");

  const [dateStyle, setDateStyle] = useState<DateStyle>({
    date: "date-standard",
    month: "month-standard",
    year: "full-year",
  });

  const [timeStyle, setTimeStyle] = useState<TimeStyle>(DEFAULT_TIMESTYLE);

  function singleDateFormat(
    format: string,
    seperator: string,
    selectedDate: Date,
    style: DateStyle,
    includeTime: boolean,
    timeStyle: TimeStyle,
  ) {
    let year = getDateStyles(selectedDate, style, "year");
    let month = getDateStyles(selectedDate, style, "month");
    let date = getDateStyles(selectedDate, style, "date");

    let arrangement = [];
    switch (format) {
      case "DD/MM/YYYY":
        arrangement = [date, month, year];
        break;
      case "DD/YYYY/MM":
        arrangement = [date, year, month];
        break;

      case "MM/DD/YYYY":
        arrangement = [month, date, year];
        break;
      case "MM/YYYY/DD":
        arrangement = [month, year, date];
        break;

      case "YYYY/MM/DD":
        arrangement = [year, month, date];
        break;
      case "YYYY/DD/MM":
        arrangement = [year, date, month];
        break;

      default:
        arrangement = [date, month, year];
    }

    let cleanedSeperator = seperator;
    if (cleanedSeperator === "(space)") cleanedSeperator = " ";

    let finalDateString =
      arrangement[0] +
      cleanedSeperator +
      arrangement[1] +
      cleanedSeperator +
      arrangement[2];

    if (!includeTime) return finalDateString;

    let finalTimeString = getTimeStyles(selectedDate, timeStyle);
    let includeComma = timeStyle.includeComma === "yes" ? "," : "";

    if (includeTime && timeStyle.position === "front") {
      return `${finalTimeString}${includeComma}  ${finalDateString}`;
    }
    if (includeTime && timeStyle.position === "back") {
      return `${finalDateString}${includeComma}  ${finalTimeString}`;
    }

    return finalDateString;
  }

  useEffect(() => {
    let string = `<div>${singleDateFormat(selectedFormat, selectedSeparator, singleDateTime, dateStyle, includeTime, timeStyle)}</div>`;

    setCodeString(string);
  }, [
    singleDateTime,
    selectedFormat,
    selectedSeparator,
    dateStyle,
    includeTime,
    timeStyle,
  ]);

  return (
    <div className="page">
      <h1 className="page-title">Hello Timezone</h1>
      <div className="sections">
        <div className="tabs">
          <div className="tabs-buttons">
            <button
              type="button"
              onClick={() => setDateType("single")}
              className={`tab-button ${dateType === "single" ? "active" : ""}`}
            >
              Single Date
            </button>
            <button
              onClick={() => setDateType("range")}
              type="button"
              className={`tab-button ${dateType === "range" ? "active" : ""}`}
            >
              Range Date
            </button>
          </div>
          <div className="tab-content">
            <div className="top-left">
              <Toggle
                checked={includeTime}
                label="Include time"
                onChange={setIncludeTime}
              />
            </div>
            <div className="select-date-part">
              {/* create a toggle here that link to  */}

              {dateType === "single" && (
                <div className="datepicker-container">
                  <DatePicker
                    id="single-date"
                    selected={singleDateTime}
                    onChange={(value: any) => setSingleDateTime(value)}
                    dateFormat={
                      includeTime ? "dd MMMM yyyy, h:mm aa" : "dd MMMM yyyy"
                    }
                    showMonthDropdown
                    showYearDropdown
                    showTimeInput={includeTime}
                    placeholderText="Select a date"
                    className="date-input"
                    calendarClassName="date-calendar"
                    wrapperClassName="date-picker"
                  />
                </div>
              )}
              {dateType === "range" && (
                <div className="datepicker-container">
                  {/* <label htmlFor="">Start time</label> */}
                  <DatePicker
                    startDate={startDateTime}
                    endDate={endDateTime}
                    dateFormat={
                      includeTime ? "dd MMMM yyyy, h:mm aa" : "dd MMMM yyyy"
                    }
                    selectsRange
                    onChange={(dates: [Date | null, Date | null]) => {
                      const [start, end] = dates;
                      setStartDateTime(start);
                      setEndDateTime(end);
                    }}
                    showMonthDropdown
                    showYearDropdown
                    showTimeInput={includeTime}
                    placeholderText="Select a date"
                    className="date-input"
                    calendarClassName="date-calendar"
                    wrapperClassName="date-picker"
                  />
                  {/* {" - "}
                  <DatePicker
                    selected={endDate}
                    onChange={setEndDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate || undefined}
                    dateFormat={
                      includeTime ? "dd MMMM yyyy, HH:mm aa" : "dd MMMM yyyy"
                    }
                    showMonthDropdown
                    showYearDropdown
                    showTimeInput={includeTime}
                    placeholderText="Select a date"
                    className="date-input"
                    calendarClassName="date-calendar"
                    wrapperClassName="date-picker"
                  /> */}
                </div>
              )}
            </div>

            {/* ---------- Select Date Format ------------ */}
            <DateFormatComponent
              format={selectedFormat}
              onFormatChange={setSelectedFormat}
              seperator={selectedSeparator}
              onSeperatorChange={setSelectedSeparator}
            />
            {/* -------------- Select Date Style -------------- */}
            <DateStyleComponent
              dateStyles={dateStyle}
              onChangeStyle={setDateStyle}
            />

            {/* ------------ Select Time Style ------------ */}
            {includeTime && (
              <TimeStyleComponent
                timeStyle={timeStyle}
                onStyleChange={setTimeStyle}
              />
            )}
          </div>
        </div>

        <div className="preview-section">
          <div className="sub-section">
            <label htmlFor="previewContainer">Preview</label>
            <div
              id="previewContainer"
              className="preview-container"
              dangerouslySetInnerHTML={{ __html: codeString }}
            ></div>
          </div>
          <div className="sub-section">
            <label htmlFor="previewContainer">Code</label>
            <CodeBlockComponent codeString={codeString} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
