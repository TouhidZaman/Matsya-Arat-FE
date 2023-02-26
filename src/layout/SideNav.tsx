import { Link, NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signOut } from "firebase/auth";
import { Button, Menu, Row } from "antd";

import "./Layout.css";
import logo from "../assets/images/logo.svg";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logOut, selectAuth } from "../features/authSlice";
import auth from "../utils/firebase.init";
import { AVATAR } from "../utils/constants";

function SideNav() {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logOut());
      })
      .catch((error) => {
        toast.error("Oops failed to logout");
      });
  };
  const sidebarNavigation = (navigation: any, index: number) =>
    navigation[1] ? (
      <Menu.Item key={index}>
        <NavLink to={`/${navigation[0]}`}>
          <span className="icon">
            <span className="material-symbols-rounded navigationIcon">
              {navigation[2]}
            </span>
          </span>
          <span className="label">{navigation[1]}</span>
        </NavLink>
      </Menu.Item>
    ) : (
      <Menu.Item className="menu-item-header" key={index}>
        {navigation[0]}
      </Menu.Item>
    );

  const date = new Date();

  // ['Url','Title','icon(based on google  icons']
  const sidebarNavigationPath = [
    ["dashboard", "Dashboard", "home"],
    ["buyers", "Buyers", "groups"],
    ["sellers", "Sellers", "groups"],
    ["Account Pages"],
    ["settings", "Settings", "settings"],
  ];

  return (
    <>
      <Link to="/dashboard">
        <Row justify="center" align="middle">
          <img height={"40px"} src={logo} alt="" />
          <h3 style={{ marginLeft: "8px", color: "#1890ff", fontSize: "18px" }}>
            Sonali Matsya Arat
          </h3>
        </Row>
      </Link>

      <Menu theme="light" mode="inline">
        {sidebarNavigationPath.map((item, index) => sidebarNavigation(item, index))}

        <Menu.Item key={sidebarNavigationPath.length + 1}>
          {!user ? (
            <NavLink to="/login">
              <span className="icon">
                <span className="material-symbols-rounded navigationIcon">key</span>
              </span>
              <span className="label">Join</span>
            </NavLink>
          ) : (
            <Button type="text" onClick={handleLogout} className="boxShadow">
              <span className="icon">
                <img src={AVATAR} alt="userIcon" />
              </span>
              <span className="label">Log Out</span>
            </Button>
          )}
        </Menu.Item>
      </Menu>
    </>
  );
}

export default SideNav;
