import {
  useId,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
} from "react";
import "./toggle.css";

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "role" | "checked" | "defaultChecked" | "onChange"
>;

export interface ToggleProps extends NativeInputProps {
  /** Text shown next to the switch */
  label?: string;
  /** Current state (controlled mode) */
  checked?: boolean;
  /** Starting state (uncontrolled mode) */
  defaultChecked?: boolean;
  /** Called with the new state whenever the switch flips */
  onChange?: (checked: boolean) => void;
}

/**
 * Toggle switch built on a real checkbox, so keyboard, screen readers
 * and forms all work for free.
 *
 * Controlled:   <Toggle checked={on} onChange={setOn} label="Dark mode" />
 * Uncontrolled: <Toggle defaultChecked label="Email alerts" />
 */
export default function Toggle({
  label,
  checked,
  defaultChecked = false,
  onChange,
  id: idProp,
  className,
  ...inputProps
}: ToggleProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState<boolean>(defaultChecked);
  const isOn = isControlled ? checked : internal;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternal(e.target.checked);
    onChange?.(e.target.checked);
  }

  return (
    <label
      className={className ? `toggle ${className}` : "toggle"}
      htmlFor={id}
    >
      <input
        {...inputProps}
        id={id}
        type="checkbox"
        role="switch"
        className="toggle__input"
        checked={isOn}
        onChange={handleChange}
      />
      <span className="toggle__track" aria-hidden="true">
        <span className="toggle__thumb" />
      </span>
      {label && <span className="toggle__label">{label}</span>}
    </label>
  );
}
