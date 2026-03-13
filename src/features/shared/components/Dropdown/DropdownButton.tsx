import { ReactNode } from "react";
import { useDropdown } from "./Dropdown";

interface DropdownButtonProps {
  children: ReactNode;
  className?: string;
}

export function DropdownButton({ children, className = '' }: DropdownButtonProps) {
  const { open, setOpen, triggerRef } = useDropdown();


  return (
    <button
      ref={triggerRef}
      onMouseDown={(e) => e.stopPropagation()}
  onClick={(e) => {
    e.stopPropagation();
    setOpen(!open);
  }}
      className={`w-full cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}