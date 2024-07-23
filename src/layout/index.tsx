import React from "react";
import { Footer, Header, Sidebar } from "../components";

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="py-5 px-4 overflow-y-scroll max-h-[75%] h-full">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
