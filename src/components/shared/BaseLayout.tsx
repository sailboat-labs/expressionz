import React from "react";

import { cn } from "@/lib/misc.lib";

import Footer from "./Footer";
import Header, { THeaderProps } from "./Header";

type TBaseLayout = {
  children: React.ReactNode;
  hideFooter?: boolean;
  childrenClass?: string;
  transparentBackground?: boolean;
  wrapperClass?: string;
};

const BaseLayout = ({
  children,
  hideFooter = false,
  showBack = false,
  variant = "base",
  transparentBackground,
  logo,
  childrenClass,
  wrapperClass,
}: TBaseLayout & THeaderProps) => {
  return (
    <main className={cn("flex min-h-screen flex-col", wrapperClass)}>
      <Header
        transparentBackground={transparentBackground}
        showBack={showBack}
        variant={variant}
        logo={logo}
      />
      <div
        className={cn(
          "box-border flex-1",
          hideFooter ? "max-h-[calc(100vh-64px)]" : "flex-1",
          childrenClass,
        )}
      >
        {children}
      </div>
      {!hideFooter && <Footer />}
    </main>
  );
};

export default BaseLayout;
