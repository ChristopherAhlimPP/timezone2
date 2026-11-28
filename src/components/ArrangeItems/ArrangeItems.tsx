import { useEffect, useState, type SetStateAction } from "react";
import "./arrange-items.css";
import { flushSync } from "react-dom";
import type { Item, ItemDetail, OutputItem } from "../../types/item-types";

type ArrangeItemProps = {
  selectedItems: ItemDetail;
  arrangedItems: OutputItem[];
  onChange: React.Dispatch<SetStateAction<OutputItem[]>>;
};

const seperator: Item[] = [
  {
    id: "space",
    name: "(space)",
    style: "",
    type: "seperator",
    selected: false,
    position: 100,
    attr: "",
    value: " ",
  },
  {
    id: "colon",
    name: ":",
    style: "",
    type: "seperator",
    selected: false,
    position: 101,
    attr: "",
    value: ":",
  },
  {
    id: "backslash",
    name: "/",
    style: "",
    type: "seperator",
    selected: false,
    position: 102,
    attr: "",
    value: "/",
  },
  {
    id: "comma",
    name: ",",
    style: "",
    type: "seperator",
    selected: false,
    position: 103,
    attr: "",
    value: ",",
  },
  {
    id: "period",
    name: ".",
    style: "",
    type: "seperator",
    selected: false,
    position: 104,
    attr: "",
    value: ".",
  },
];

function withTransition(update: () => void) {
  if (!document.startViewTransition) {
    update();
    return;
  }

  document.startViewTransition(() => {
    flushSync(update);
  });
}

const ArrangeItems = ({
  selectedItems,
  arrangedItems,
  onChange,
}: ArrangeItemProps) => {
  const [items, setItems] = useState<Item[]>(
    Object.values(selectedItems).filter((i) => i.selected),
  );

  // const filteredItems: Item[] = Object.values(selectedItems).filter(
  //   (i) => i.selected,
  // );

  // setItems(filteredItems);

  function handleAddItem(item: Item) {
    withTransition(() => {
      setItems((prev) => prev.filter((it) => it.id !== item.id));
      onChange((prev) => [...prev, { ...item, uid: item.id }]);
    });
  }

  function handleAddSeperator(sep: Item, el: HTMLElement) {
    const uid = `${sep.id}-${crypto.randomUUID()}`;
    const update = () => onChange((prev) => [...prev, { ...sep, uid }]);

    if (!document.startViewTransition) {
      update();
      return;
    }

    el.style.viewTransitionName = `item-${uid}`;

    document.startViewTransition(() => {
      flushSync(update);
      el.style.viewTransitionName = "";
    });
  }

  function handleRemoveItem(item: OutputItem) {
    withTransition(() => {
      onChange((prev) => prev.filter((it) => it.uid !== item.uid));
      if (item.type === "datetime") {
        setItems((prev) =>
          [...prev, item].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
        );
      }
    });
  }

  return (
    <div className="arrange-item-container">
      <div className="option-container">
        <div className="section-option">
          {items?.map((item) => (
            <div
              key={item.id}
              onClick={() => handleAddItem(item)}
              className="item"
              style={{ viewTransitionName: `item-${item.id}` }}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="section-seperator">
          {seperator.map((sep) => (
            <div
              key={sep.id}
              onClick={(e) => handleAddSeperator(sep, e.currentTarget)}
              className="item"
            >
              {sep.name}
            </div>
          ))}
        </div>
      </div>
      <div className="section-output">
        {arrangedItems?.map((out) => (
          <div
            key={out.uid}
            onClick={() => handleRemoveItem(out)}
            className="item"
            style={{ viewTransitionName: `item-${out.uid}` }}
          >
            {out.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrangeItems;
