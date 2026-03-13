import { ReactNode } from "react";
import { useDropdown } from "./Dropdown";

type Placement =
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "top"
  | "top-left"
  | "top-right"
  | "left"
  | "right";

interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
  placement?: Placement;
}

export function DropdownMenu({
    children,
    className = '',
    placement = "bottom"
}: DropdownMenuProps) {
  const { open } = useDropdown();

  if (!open) return null;
const getPlacement = () => {
    switch (placement) {
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2";

      case "bottom-left":
        return "top-full ltr:right-0 rtl:left-0 mt-2";

      case "bottom-right":
        return "top-full ltr:left-0 rtl:right-0 mt-2";

      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";

      case "top-left":
        return "bottom-full ltr:right-0 rtl:left-0 ms-2 mb-2";

      case "top-right":
        return "bottom-full ltr:left-0 rtl:right-0 ms-2 mb-2";

        case "left":
          return "top-1/2 -translate-y-1/2 right-full me-2";

        case "right":
          return "top-1/2 -translate-y-1/2 left-full ms-2";

      default:
        return "top-full left-0 mt-2";
    }
  };
  return (
    <div
      className={`
        absolute
        ${getPlacement()}
        w-48
        rounded-lg
        bg-neutral-200
        dark:bg-neutral-800
        border border-neutral-300/50
        dark:border-neutral-700/50
        shadow-lg
        p-1
        z-100
        ${className}
      `}
    >
      {children}
    </div>
  );
}