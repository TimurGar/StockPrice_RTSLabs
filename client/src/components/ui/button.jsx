import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils/cn";
import { BottomGradient } from "./bottomGradient";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      bottomGradient = true,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-to-br from-black to-neutral-600 text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]":
              variant === "default",
            "text-neutral-700 shadow-input bg-gray-50": variant === "secondary",
            "border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900":
              variant === "outline",
            "h-9 px-4 py-2": size === "sm",
            "font-medium rounded-md h-10 px-4 py-2 text-base":
              size === "default",
            "h-11 rounded-md px-8": size === "lg",
          },
          bottomGradient && "relative group/btn",
          className
        )}
        ref={ref}
        {...props}
      >
        {props.children}
        {bottomGradient && <BottomGradient />}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export default Button;
