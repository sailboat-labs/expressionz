import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/misc.lib";

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
