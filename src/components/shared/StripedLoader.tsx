import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

const StripedLoader = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn("striped-loader h-2 w-full rounded-full", className)}
      {...rest}
    ></div>
  );
};

export default StripedLoader;
