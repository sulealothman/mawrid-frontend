import { ReactNode } from "react";
import { useDropdown } from "./Dropdown";
import { cn } from "../../utils/utils";

interface DropdownItemProps {
  children: ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export function DropdownItem({
  children,
  className = "",
  onClick,
}: DropdownItemProps) {
  const { setOpen } = useDropdown();

  const handleClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    setOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className={cn('w-full text-start px-2 py-2 rounded-md text-sm transition flex items-center gap-2 cursor-pointer font-mixed text-primary', className)}
    >
      {children}
    </button>
  );
}