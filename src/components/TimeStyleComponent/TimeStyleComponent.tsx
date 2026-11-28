import React from "react";
import "./time-style-component.css";

export type TimeStyle = {
  format: "12hr" | "24hr";
  hour: "h-standard" | "h-pad-start";
  minute: "m-standard" | "m-pad-start";
  ampm: "upp" | "low" | "na";
  position: "front" | "back";
  includeComma: "yes" | "no";
};

export const DEFAULT_TIMESTYLE: TimeStyle = {
  format: "12hr",
  hour: "h-standard",
  minute: "m-pad-start",
  ampm: "upp",
  position: "back",
  includeComma: "yes",
};

const timeStyles = {
  format: [
    { value: "12hr", label: "12 Hr" },
    { value: "24hr", label: "24 Hr" },
  ],
  hour: [
    { value: "h-standard", label: "3" },
    { value: "h-pad-start", label: "03" },
  ],
  minute: [
    { value: "m-standard", label: "5" },
    { value: "m-pad-start", label: "05" },
  ],
  ampm: [
    { value: "upp", label: "AM" },
    { value: "low", label: "am" },
  ],
  position: [
    { value: "front", label: "Before date" },
    { value: "back", label: "After date" },
  ],
  includeComma: [
    { value: "yes", label: "Include comma(,) to seperated date and time" },
    { value: "no", label: "Do not include comma(,)" },
  ],
};

type TimeStyleComponentProps = {
  timeStyle: TimeStyle;
  onStyleChange: React.Dispatch<React.SetStateAction<TimeStyle>>;
};

const TimeStyleComponent = ({
  timeStyle,
  onStyleChange,
}: TimeStyleComponentProps) => {
  return (
    <div className="time-style-container">
      <p className="time-style__note">
        *Options are based on the time: 3:05 AM
      </p>
      {/* Choose format */}
      <fieldset className="time-style__group">
        <legend className="time-style__legend">Choose a time format</legend>
        <div className="time-style__options">
          {timeStyles.format.map((ts, idx) => (
            <label key={idx} className="time-style__option">
              <input
                type="radio"
                name="time-style-format"
                value={ts.value}
                checked={timeStyle.format === ts.value}
                onChange={(e) =>
                  onStyleChange((prev: TimeStyle) => ({
                    ...prev,
                    format: e.target.value as TimeStyle["format"],
                  }))
                }
              />
              {ts.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Choose Hour */}
      <fieldset className="time-style__group">
        <legend className="time-style__legend">Choose Hour style</legend>
        <div className="time-style__options">
          {timeStyles.hour.map((ts, idx) => (
            <label key={idx} className="time-style__option">
              <input
                type="radio"
                name="time-style-hour"
                value={ts.value}
                checked={timeStyle.hour === ts.value}
                onChange={(e) =>
                  onStyleChange((prev: TimeStyle) => ({
                    ...prev,
                    hour: e.target.value as TimeStyle["hour"],
                  }))
                }
              />
              {ts.label}
            </label>
          ))}
        </div>
      </fieldset>
      {/* Choose Minute */}
      <fieldset className="time-style__group">
        <legend className="time-style__legend">Choose minute style</legend>
        <div className="time-style__options">
          {timeStyles.minute.map((ts, idx) => (
            <label key={idx} className="time-style__option">
              <input
                type="radio"
                name="time-style-minute"
                value={ts.value}
                checked={timeStyle.minute === ts.value}
                onChange={(e) =>
                  onStyleChange((prev: TimeStyle) => ({
                    ...prev,
                    minute: e.target.value as TimeStyle["minute"],
                  }))
                }
              />
              {ts.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Choose Dayperiod style */}
      {timeStyle.format === "12hr" && (
        <fieldset className="time-style__group">
          <legend className="time-style__legend">Choose ampm style</legend>
          <div className="time-style__options">
            {timeStyles.ampm.map((ts, idx) => (
              <label key={idx} className="time-style__option">
                <input
                  type="radio"
                  name="time-style-ampm"
                  value={ts.value}
                  checked={timeStyle.ampm === ts.value}
                  onChange={(e) =>
                    onStyleChange((prev: TimeStyle) => ({
                      ...prev,
                      ampm: e.target.value as TimeStyle["ampm"],
                    }))
                  }
                />
                {ts.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <fieldset className="time-style__group">
        <legend className="time-style__legend">Choose date position</legend>
        <div className="time-style__options">
          {timeStyles.position.map((ts, idx) => (
            <label key={idx} className="time-style__option">
              <input
                type="radio"
                name="time-style-position"
                value={ts.value}
                checked={timeStyle.position === ts.value}
                onChange={(e) =>
                  onStyleChange((prev: TimeStyle) => ({
                    ...prev,
                    position: e.target.value as TimeStyle["position"],
                  }))
                }
              />
              {ts.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="time-style__group">
        <legend className="time-style__legend">
          Choose include/exclude comma
        </legend>
        <div className="time-style__options">
          {timeStyles.includeComma.map((ts, idx) => (
            <label key={idx} className="time-style__option">
              <input
                type="radio"
                name="time-style-includeComma"
                value={ts.value}
                checked={timeStyle.includeComma === ts.value}
                onChange={(e) =>
                  onStyleChange((prev: TimeStyle) => ({
                    ...prev,
                    includeComma: e.target.value as TimeStyle["includeComma"],
                  }))
                }
              />
              {ts.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div style={{ color: "lightgrey", fontStyle: "italic" }}>
        No preview yet.
      </div>
    </div>
  );
};

export default TimeStyleComponent;
