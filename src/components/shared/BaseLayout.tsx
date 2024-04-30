import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type TBaseLayout = { children: React.ReactNode };

const BaseLayout = ({ children }: TBaseLayout) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="box-border flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
