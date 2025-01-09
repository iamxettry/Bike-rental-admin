// card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm bg-white shadow-purple-200 my-2",
      className
    )}
    {...props}
  />
));
Container.displayName = "Container";

const ContainerTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
ContainerTitle.displayName = "ContainerTitle";

const ContainerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0  grid lg:grid-cols-4 gap-4 w-full ", className)}
    {...props}
  />
));
ContainerContent.displayName = "ContainerContent";

export { Container, ContainerTitle, ContainerContent };
