import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import TopBar from "./TopBar";

const Layout = () => {
  return (
    <>
      <SideNav />
      <div>
        <TopBar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
