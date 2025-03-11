"use client";
import React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={() => onOpenChange(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

interface ChildProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: ChildProps) {
  return <div className={`bg-white rounded p-4 ${className || ""}`}>{children}</div>;
}

export function DialogHeader({ children }: ChildProps) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: ChildProps) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

export function DialogDescription({ children }: ChildProps) {
  return <p className="text-sm text-gray-600">{children}</p>;
}

export function DialogFooter({ children }: ChildProps) {
  return <div className="mt-4">{children}</div>;
}