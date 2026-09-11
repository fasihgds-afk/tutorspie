import { Children, isValidElement, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
export default function HeroSelect({
  children,
  defaultValue,
  id = "ddl_subject",
  label = "Subject",
}) {
  const [value, setValue] = useState(defaultValue);
  const [height, setHeight] = useState(260);
  const trigger = useRef(null);
  function renderOptions(nodes, seen = new Set()) {
    return Children.map(nodes, (node) => {
      if (!isValidElement(node)) return null;
      const item = node;
      if (item.type === "optgroup")
        return (
          <SelectGroup>
            <SelectLabel>{item.props.label}</SelectLabel>
            {renderOptions(item.props.children, seen)}
          </SelectGroup>
        );
      if (item.type === "option") {
        const optionValue = String(item.props.value ?? "");
        if (!optionValue || seen.has(optionValue)) return null;
        seen.add(optionValue);
        return (
          <SelectItem value={optionValue}>{item.props.children}</SelectItem>
        );
      }
      return null;
    });
  }
  return (
    <>
      <select
        hidden
        aria-hidden="true"
        tabIndex={-1}
        data-order-field
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        {children}
      </select>
      <Select
        value={value}
        onValueChange={setValue}
        onOpenChange={(open) => {
          if (!open || !trigger.current) return;
          if (
            window.innerHeight -
              trigger.current.getBoundingClientRect().bottom <
            180
          )
            trigger.current.scrollIntoView({
              block: "center",
              behavior: "instant",
            });
          setHeight(
            Math.max(
              120,
              Math.min(
                260,
                window.innerHeight -
                  trigger.current.getBoundingClientRect().bottom -
                  16,
              ),
            ),
          );
        }}
      >
        <SelectTrigger
          ref={trigger}
          id={id}
          aria-label={label}
          className="subject-trigger"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          className="subject-options"
          position="popper"
          side="bottom"
          align="start"
          avoidCollisions={false}
          sideOffset={4}
          style={{ maxHeight: height }}
        >
          {renderOptions(children)}
        </SelectContent>
      </Select>
    </>
  );
}
