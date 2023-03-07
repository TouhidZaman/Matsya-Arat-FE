import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import classes from "./TabsView.module.css";

export type Tab = {
  displayName: string;
  path: string;
};

interface TabsViewProps {
  tabs: Tab[];
}

function TabsView({ tabs }: TabsViewProps) {
  return (
    <div className={classes.tabsContainer}>
      <div className={classes.tabs}>
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            className={({ isActive }) =>
              isActive ? `${classes.active} ${classes.tabsItem}` : classes.tabsItem
            }
            to={tab.path}
            end
          >
            {tab.displayName}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default TabsView;
