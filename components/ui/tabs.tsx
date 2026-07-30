"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Tabs({ defaultValue, value, onValueChange, className, children }: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const activeValue = value ?? internalValue;

  const handleChange = (v: string) => {
    if (onValueChange) onValueChange(v);
    else setInternalValue(v);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, { activeValue, onValueChange: handleChange } as Record<string, unknown>);
  });

  return <div className={className}>{childrenWithProps}</div>;
}

function TabsList({ children, className, activeValue, onValueChange }: {
  children: React.ReactNode;
  className?: string;
  activeValue?: string;
  onValueChange?: (v: string) => void;
}) {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement<{ value?: string; active?: boolean; onClick?: () => void }>(child)) return child;
    const value = child.props.value;
    return React.cloneElement(child, {
      active: value === activeValue,
      onClick: () => onValueChange?.(value ?? ""),
    });
  });

  return <div className={cn("inline-flex h-10 items-center gap-1 rounded-xl bg-muted p-1", className)}>{childrenWithProps}</div>;
}

function TabsTrigger({ children, className, active, onClick }: {
  children: React.ReactNode;
  className?: string;
  value?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
        active ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  );
}

export { Tabs, TabsList, TabsTrigger };
