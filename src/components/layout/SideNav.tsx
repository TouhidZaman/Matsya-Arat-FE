import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "antd";
import "./Layout.css";

import logo from "../../assets/images/logo.png";

function SideNav() {
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
    ["home", "Home", "home"],
    ["Sell fish", "sell-fish", "local_gas_station"],
    ["Buy Fish", "buy-fish", "propane_tank"],
    ["Add Customer", "add-customer", "water_drop"],
    ["customers", "Customers", "groups"],
    ["Account Pages"],
    ["settings", "Settings", "settings"],
  ];

  return (
    <>
      <Link to="/home">
        <div className="brand logoBrand">
          <img src={logo} alt="" />
          <span>Fish Manager</span>
        </div>
      </Link>

      <Menu theme="light" mode="inline">
        {sidebarNavigationPath.map((item, index) => sidebarNavigation(item, index))}

        <Menu.Item key={sidebarNavigationPath.length + 1}>
          <NavLink to="/login">
            <span className="icon">
              <span className="material-symbols-rounded navigationIcon">key</span>
            </span>
            <span className="label">Join</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default SideNav;
