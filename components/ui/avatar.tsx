import { cn } from "@/lib/utils";

function Avatar({ className, initials, ...props }: React.ComponentProps<"div"> & { initials?: string }) {
  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground",
        className
      )}
      {...props}
    >
      {initials || "?"}
    </div>
  );
}

export { Avatar };
