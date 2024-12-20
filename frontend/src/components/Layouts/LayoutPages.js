import React from "react";
import HeaderPages from "./HeaderPages";
import FooterPages from "./FooterPages";

function Layout({ children }) {
  return (
    <>
      <HeaderPages />
      <div>{children}</div>
      <FooterPages />
    </>
  );
}

export default Layout;
