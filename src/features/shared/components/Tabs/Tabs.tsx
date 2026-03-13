"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
  KeyboardEvent,
} from "react";

type TabsContextType = {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  tabsCount: number;
  setTabsCount: (count: number) => void;
};

type TabChildProps = {
  index?: number;
  isActive?: boolean;
  children?: ReactNode;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used in TabGroup");
  }
  return context;
}

export function TabGroup({
  children,
  defaultIndex = 0,
}: {
  children: ReactNode;
  defaultIndex?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [tabsCount, setTabsCount] = useState(0);

  return (
    <TabsContext.Provider
      value={{ activeIndex, setActiveIndex, tabsCount, setTabsCount }}
    >
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { activeIndex, setActiveIndex, setTabsCount } = useTabs();

  const tabsArray = Children.toArray(children);

  setTabsCount(tabsArray.length);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!tabsArray.length) return;

    if (e.key === "ArrowRight") {
      setActiveIndex((prev) => (prev + 1) % tabsArray.length);
    }

    if (e.key === "ArrowLeft") {
      setActiveIndex((prev) =>
        prev - 1 < 0 ? tabsArray.length - 1 : prev - 1
      );
    }

    if (e.key === "Home") {
      setActiveIndex(0);
    }

    if (e.key === "End") {
      setActiveIndex(tabsArray.length - 1);
    }
  };

  return (
    <div
      role="tablist"
      style={{ display: "flex", gap: "16px" }}
      onKeyDown={handleKeyDown}
      className={className}
    >
      {tabsArray.map((child, index) => {
        if (!isValidElement(child)) return child;

        return cloneElement(child as React.ReactElement<TabChildProps>, {
          index,
          isActive: activeIndex === index,
        });
      })}
    </div>
  );
}

export function Tab({
  children,
  index,
  isActive,
}: {
  children: ReactNode;
  index?: number;
  isActive?: boolean;
}) {
  const { setActiveIndex } = useTabs();

  return (
    <button
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveIndex(index ?? 0)}
      className={`px-4 py-2 border-b-2 cursor-pointer disabled:cursor-default ${isActive ? "border-neutral-300 dark:border-neutral-700 font-bold" : "border-transparent font-normal"} focus:outline-none`}
    >
      {children}
    </button>
  );
}

export function TabPanels({ children }: { children: ReactNode }) {
  const { activeIndex } = useTabs();
  const panels = Children.toArray(children);

  return (
    <div style={{ marginTop: "20px" }}>
      {panels.map((panel, index) =>
        index === activeIndex ? (
          <div key={index} role="tabpanel">
            {panel}
          </div>
        ) : null
      )}
    </div>
  );
}

export function TabPanel({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
