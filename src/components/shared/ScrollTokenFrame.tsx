import { cn } from "@/lib/misc.lib";
import { ReactNode } from "react";

type TScrollTokenFrameProps = {
  wrapperClass?: string;
  children?: ReactNode;
  renderHeaderContent?: () => ReactNode;
  renderFooterContent?: () => ReactNode;
};

const ScrollTokenFrame = ({
  wrapperClass,
  children,
  renderHeaderContent,
  renderFooterContent,
}: TScrollTokenFrameProps) => {
  return (
    <div className={cn("box-border h-screen text-black", wrapperClass)}>
      <div className="mx-auto h-full max-w-5xl">
        <div
          className={cn(
            "mx-[20px] flex h-full flex-col md:mx-[40px] ",
            "border-8 border-[#3E1600]",
            "divide-y-8 divide-[#3E1600]",
          )}
        >
          <div
            className={cn(
              " h-[70px] bg-[#FBAF68]",
              "relative border-b-[16px] border-[#B8712E]",
            )}
          >
            <div
              className={cn(
                "absolute left-[calc(100%+8px)] top-1/2 mt-2 h-[70%] w-[20px] -translate-y-1/2 md:w-[40px]",
                "border-r-8  border-[#3E1600] bg-[#F0BC00]",
                "before:absolute before:bottom-full before:w-full before:border-t-8 before:border-[#3E1600]",
                "after:absolute after:top-full after:w-full after:border-t-8 after:border-[#3E1600]",
              )}
            ></div>
            <div
              className={cn(
                "absolute right-[calc(100%+8px)] top-1/2 mt-2 h-[70%] w-[20px] -translate-y-1/2 md:w-[40px]",
                "border-l-8 border-[#3E1600] bg-[#F0BC00]",
                "before:absolute before:bottom-full before:w-full before:border-t-8 before:border-[#3E1600]",
                "after:absolute after:top-full after:w-full after:border-t-8 after:border-[#3E1600]",
              )}
            ></div>
            <div className="flex h-full items-center">
              <div className="flex-1">
                {renderHeaderContent && renderHeaderContent()}
              </div>
            </div>
          </div>

          <div className="h-[calc(80vh-140px)] flex-1 bg-[#FAD8B9]">
            <div
              className={cn(
                "h-full",
                "border-8 border-b-0 border-[#B8712E]",
                "overflow-y-auto p-4 lg:p-5",
              )}
            >
              {children}
            </div>
          </div>

          <div className={cn("relative  h-[70px] bg-[#FBAF68]")}>
            <div className={cn("h-full", "border-t-[16px] border-[#B8712E]")}>
              {renderFooterContent && renderFooterContent()}
            </div>

            <div
              className={cn(
                "absolute left-[calc(100%+8px)] top-1/2 h-[70%] w-[20px] -translate-y-1/2 md:w-[40px]",
                "border-r-8  border-[#3E1600] bg-[#F0BC00]",
                "before:absolute before:bottom-full before:w-full before:border-t-8 before:border-[#3E1600]",
                "after:absolute after:top-full after:w-full after:border-t-8 after:border-[#3E1600]",
              )}
            ></div>
            <div
              className={cn(
                "absolute right-[calc(100%+8px)] top-1/2 h-[70%] w-[20px] -translate-y-1/2 md:w-[40px]",
                "border-l-8 border-[#3E1600] bg-[#F0BC00]",
                "before:absolute before:bottom-full before:w-full before:border-t-8 before:border-[#3E1600]",
                "after:absolute after:top-full after:w-full after:border-t-8 after:border-[#3E1600]",
              )}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollTokenFrame;
