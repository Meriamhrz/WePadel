import React from "react";
import HeaderPagesAdmin from "./HeaderPagesAdmin";
import FooterPages from "./FooterPages";

function Layout({ children }) {
  return (
    <>
      <HeaderPagesAdmin />
      <div>{children}</div>
      <FooterPages />
    </>
  );
}

export default Layout;
