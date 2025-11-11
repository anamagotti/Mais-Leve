"use client"

import type React from "react"

export const DropdownMenu = {
  Root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Trigger: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  Content: ({ children }: { children: React.ReactNode }) => (
    <div className="absolute bg-popover border rounded-md shadow-md p-1">{children}</div>
  ),
  Item: ({ children, ...props }: any) => (
    <button className="w-full text-left px-3 py-2 hover:bg-accent rounded" {...props}>
      {children}
    </button>
  ),
}
