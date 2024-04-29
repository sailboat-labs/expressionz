import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type TBaseLayout = { children: React.ReactNode };

const BaseLayout = ({ children }: TBaseLayout) => {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-264px)]">{children}</div>
      <Footer />
    </>
  );
};

export default BaseLayout;
