import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full border border-input bg-transparent py-1 px-3 text-sm rou file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground rounded-md focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-primary/70 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
