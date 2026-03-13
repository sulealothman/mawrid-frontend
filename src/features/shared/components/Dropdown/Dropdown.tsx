"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";

import { DropdownButton } from "./DropdownButton";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownItem } from "./DropdownItem";

type DropdownContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export function useDropdown() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("Dropdown components must be used in Dropdown");
  }

  return context;
}

interface DropdownProps {
  children: ReactNode;
  className?: string;
}

function DropdownRoot({ children, className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
      <div
        ref={dropdownRef}
        className={`relative inline-block w-full ${className}`}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

type DropdownComponent = typeof DropdownRoot & {
  Button: typeof DropdownButton;
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
};

export const Dropdown = DropdownRoot as DropdownComponent;

Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;