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
import TimeStyleComponent, {
  DEFAULT_TIMESTYLE,
  type TimeStyle,
} from "./components/TimeStyleComponent/TimeStyleComponent";
import {
  addDateTimeInfo,
  getDateStyles,
  getTimeStyles,
} from "./utils/datetime-styles";
import {
  browserTimeZone,
  DEFAULT_ITEM,
  type ItemDetail,
  type OutputItem,
} from "./types/item-types";
import SelectItemComponent from "./components/SelectItemComponent/SelectItemComponent";
import ArrangeItems from "./components/ArrangeItems/ArrangeItems";

type DateValue = Date;

// check out this later.
Intl;

const defaultPreviewHtml = `<div style="color: lightgrey; font-style: italic;" >No preview yet.</div>`;

function App() {
  const [dateType, setDateType] = useState<"single" | "range">("single");
  const [singleDateTime, setSingleDateTime] = useState<DateValue>(new Date());
  const [startDateTime, setStartDateTime] = useState<Date | null>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date | null>();
  const [codeString, setCodeString] = useState<string>("");

  const [selectedFormat, setSelectedFormat] = useState<string>("DD/MM/YYYY");
  const [selectedSeparator, setSelectedSeparator] = useState<string>("/");

  // todo: might consider to use the selectedItems data instead
  const [dateStyle, setDateStyle] = useState<DateStyle>({
    date: "date-standard",
    month: "month-standard",
    year: "full-year",
    day: "day-cap-long",
  });

  const [timeStyle, setTimeStyle] = useState<TimeStyle>(DEFAULT_TIMESTYLE);

  const [selectedItems, setSelectedItems] = useState<ItemDetail>(DEFAULT_ITEM);
  const [arrangedItems, setArrangedItems] = useState<OutputItem[]>([]);

  useEffect(() => {
    let html = "";
    let newArrItem: OutputItem[] = addDateTimeInfo(
      singleDateTime,
      arrangedItems,
    );

    if (newArrItem.length > 0) {
      for (const item of newArrItem) {
        html += `<span>${item.value}</span>`;
      }

      html = `<div>${html}</div>`;
    }

    setCodeString(html);
  }, [singleDateTime, arrangedItems]);

  // function singleDateFormat(
  //   format: string,
  //   seperator: string,
  //   selectedDate: Date,
  //   selectedItems: ItemDetail,
  //   style: DateStyle,
  //   timeStyle: TimeStyle,
  // ) {
  //   let year = getDateStyles(selectedDate, style, "year");
  //   let month = getDateStyles(selectedDate, style, "month");
  //   let date = getDateStyles(selectedDate, style, "date");

  //   let arrangement = [];
  //   switch (format) {
  //     case "DD/MM/YYYY":
  //       arrangement = [date, month, year];
  //       break;
  //     case "DD/YYYY/MM":
  //       arrangement = [date, year, month];
  //       break;

  //     case "MM/DD/YYYY":
  //       arrangement = [month, date, year];
  //       break;
  //     case "MM/YYYY/DD":
  //       arrangement = [month, year, date];
  //       break;

  //     case "YYYY/MM/DD":
  //       arrangement = [year, month, date];
  //       break;
  //     case "YYYY/DD/MM":
  //       arrangement = [year, date, month];
  //       break;

  //     default:
  //       arrangement = [date, month, year];
  //   }

  //   let cleanedSeperator = seperator;
  //   if (cleanedSeperator === "(space)") cleanedSeperator = " ";

  //   let finalDateString =
  //     arrangement[0] +
  //     cleanedSeperator +
  //     arrangement[1] +
  //     cleanedSeperator +
  //     arrangement[2];

  //   if (!includeTime) return finalDateString;

  //   let finalTimeString = getTimeStyles(selectedDate, timeStyle);
  //   let includeComma = timeStyle.includeComma === "yes" ? "," : "";

  //   if (includeTime && timeStyle.position === "front") {
  //     return `${finalTimeString}${includeComma}  ${finalDateString}`;
  //   }
  //   if (includeTime && timeStyle.position === "back") {
  //     return `${finalDateString}${includeComma}  ${finalTimeString}`;
  //   }

  //   return finalDateString;
  // }

  // useEffect(() => {
  //   let string = `<div>${singleDateFormat(selectedFormat, selectedSeparator, singleDateTime, dateStyle, includeTime, timeStyle)}</div>`;

  //   setCodeString(string);
  // }, [
  //   singleDateTime,
  //   selectedFormat,
  //   selectedSeparator,
  //   dateStyle,
  //   includeTime,
  //   timeStyle,
  // ]);

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
            <SelectItemComponent
              selectedItems={selectedItems}
              onSelectedItemChange={setSelectedItems}
            />
            {/* <div className="top-left">
              <Toggle
                checked={includeTime}
                label="Include time"
                onChange={setIncludeTime}
              />
            </div> */}
            <div className="select-date-part">
              {/* create a toggle here that link to  */}

              {/* {dateType === "single" && (
                <div className="datepicker-container">
                  <DatePicker
                    id="single-date"
                    selected={singleDateTime}
                    onChange={(value: any) => setSingleDateTime(value)}
                    dateFormat={
                      selectedItems.hour.include
                        ? "dd MMMM yyyy, h:mm aa"
                        : "dd MMMM yyyy"
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
              )} */}
              {dateType === "single" && (
                <div className="datepicker-container">
                  <DatePicker
                    id="single-date"
                    selected={singleDateTime}
                    onChange={(value: any) => setSingleDateTime(value)}
                    dateFormat={
                      selectedItems.hour.selected
                        ? selectedItems.minute.selected
                          ? "dd MMMM yyyy, h:mm aa"
                          : "dd MMMM yyyy, h aa"
                        : "dd MMMM yyyy"
                    }
                    showMonthDropdown
                    showYearDropdown
                    showTimeSelect={
                      selectedItems.hour.selected &&
                      !selectedItems.minute.selected
                    }
                    showTimeInput={selectedItems.minute.selected}
                    timeIntervals={60}
                    placeholderText="Select a date"
                    className="date-input"
                    calendarClassName="date-calendar"
                    wrapperClassName="date-picker"
                  />
                  <small className="small_note">
                    Note: Your selected date time here are based of your browser
                    timezone: <strong>{browserTimeZone}</strong>
                  </small>
                </div>
              )}
              {dateType === "range" && (
                <div className="datepicker-container">
                  {/* <label htmlFor="">Start time</label> */}
                  {/* <DatePicker
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
                  /> */}
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

            {/* ---------- Arrange Style ------------ */}

            <ArrangeItems
              selectedItems={selectedItems}
              arrangedItems={arrangedItems}
              onChange={setArrangedItems}
            />

            {/* ---------- Select Date Format ------------ */}
            {/* <DateFormatComponent
              format={selectedFormat}
              onFormatChange={setSelectedFormat}
              seperator={selectedSeparator}
              onSeperatorChange={setSelectedSeparator}
            /> */}
            {/* -------------- Select Date Style -------------- */}
            <DateStyleComponent
              selectedItems={selectedItems}
              dateStyles={dateStyle}
              onChangeStyle={setDateStyle}
              onChangeFormat={setSelectedItems}
            />

            {/* ------------ Select Time Style ------------ */}
            {selectedItems.hour && (
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
              dangerouslySetInnerHTML={{
                __html:
                  codeString && codeString !== ""
                    ? codeString
                    : defaultPreviewHtml,
              }}
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
