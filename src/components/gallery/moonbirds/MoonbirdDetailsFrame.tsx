import { cn } from "@/lib/utils";
import { LegacyRef, forwardRef } from "react";

type TMoonbirdDetailsFrameProps = {
  children: [React.ReactNode, React.ReactNode];
};

const MoonbirdDetailsFrame = forwardRef(
  (
    { children }: TMoonbirdDetailsFrameProps,
    ref: LegacyRef<HTMLDivElement>,
  ) => {
    return (
      <div className="box-border flex h-screen w-screen items-center justify-center p-8">
        <div
          ref={ref}
          className={cn(
            "relative box-border flex h-[90vh] max-w-7xl flex-col items-center justify-center",
            "before:absolute before:-inset-x-2 before:inset-y-2 before:z-10 before:box-border before:opacity-70",
            "before:border-8 before:border-[#BDBCFF] before:bg-[#553184] ",
            "after:absolute after:inset-0 after:box-border after:border-8 after:border-[#BDBCFF]  after:bg-[#553184] after:opacity-70",
            "flex-1",
          )}
        >
          <div
            className={cn(
              "relative z-20 h-[calc(100%-32px)] w-[calc(100%-16px)]  divide-[#BDBCFF] divide-opacity-80 lg:divide-x-8",
              "grid overflow-y-auto py-12 lg:grid-cols-2 lg:overflow-y-clip lg:py-0",
            )}
          >
            <div className="box-border h-[87vh] w-full px-8 lg:py-8">
              {children[0]}
            </div>

            <div className="box-border h-[87vh] w-full px-8 lg:py-8">
              {children[1]}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default MoonbirdDetailsFrame;
