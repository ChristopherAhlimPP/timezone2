import type { ItemDetail } from "../../types/item-types";
import Toggle from "../ToggleComponent/Toggle";
import "./select-item-component.css";
import React, { useState, type SetStateAction } from "react";

type SelectItemProps = {
  selectedItems: ItemDetail;
  onSelectedItemChange: React.Dispatch<SetStateAction<ItemDetail>>;
};

const SelectItemComponent = ({
  selectedItems,
  onSelectedItemChange,
}: SelectItemProps) => {
  return (
    <div className="select-item-container">
      <h3>Select items to include</h3>
      <div className="select-item-list">
        <Toggle
          checked={selectedItems.date.selected}
          label="Date"
          onChange={(checked) =>
            onSelectedItemChange((prev) => ({
              ...prev,
              date: { ...prev.date, selected: checked },
            }))
          }
        />
        <Toggle
          checked={selectedItems.month.selected}
          label="Month"
          onChange={(checked) =>
            onSelectedItemChange((prev) => ({
              ...prev,
              month: { ...prev.month, selected: checked },
            }))
          }
        />
        <Toggle
          checked={selectedItems.year.selected}
          label="Year"
          onChange={(checked) =>
            onSelectedItemChange((prev) => ({
              ...prev,
              year: { ...prev.year, selected: checked },
            }))
          }
        />
        <Toggle
          checked={selectedItems.day.selected}
          label="Day"
          onChange={(checked) =>
            onSelectedItemChange((prev) => ({
              ...prev,
              day: { ...prev.day, selected: checked },
            }))
          }
        />
        <Toggle
          checked={selectedItems.hour.selected}
          label="Hour"
          onChange={(checked) =>
            onSelectedItemChange((prev) => ({
              ...prev,
              hour: { ...prev.hour, selected: checked },
            }))
          }
        />
        <Toggle
          checked={selectedItems.minute.selected}
          label="Minute"
          onChange={(checked) =>
            onSelectedItemChange((prev) => ({
              ...prev,
              minute: { ...prev.minute, selected: checked },
            }))
          }
        />

        <Toggle
          checked={selectedItems.timeZone.selected}
          label="Timezone"
          onChange={(checked) =>
            onSelectedItemChange((prev) => ({
              ...prev,
              timeZone: { ...prev.timeZone, selected: checked },
            }))
          }
        />
      </div>
    </div>
  );
};

export default SelectItemComponent;
