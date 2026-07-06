import { useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import SidbanSearch from "./SidbanSearch";
import SidbanScrollTop from "./SidbanScrollTop";
import SidbanAI from "./SidbanAI";


export default function SidbanErrorLayout({ children }) {


  const location = useLocation();


  const hideLayout =location.pathname === "/error";

  return (
    <>
      {!hideLayout && (
        <>
          <SidbanScrollTop />
          <Header />
          <SidbanAI/>
          <Navbar/>
          <SidbanSearch />

        </>
      )}
      {children}
    </>
  );
}