import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Row, Col, Breadcrumb, Button, Typography } from "antd";

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
  </svg>,
];

function Header({ subName, onPress }: { subName: string; onPress: () => void }) {
  const navigate = useNavigate();
  const firstDevider = subName.indexOf("/");

  const reverseSubname = [...subName].reverse().join("");
  const routeTitle = [...reverseSubname.slice(0, reverseSubname.indexOf("/") + 1)]
    .reverse()
    .join("")
    .replace("/", "");
  let routeTitleBread = "";
  if (routeTitle) {
    routeTitleBread = ` / ${routeTitle}`;
  }
  let newSubName = "";
  if (firstDevider > 0) {
    newSubName = `${subName.slice(0, firstDevider)}  ${routeTitleBread}`;
  } else {
    newSubName = subName.replace("/", "");
  }

  const { Title } = Typography;

  useEffect(() => window.scrollTo(0, 0));

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb separator="">
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <Breadcrumb.Item>{`/ ${newSubName}`}</Breadcrumb.Item>
            </Breadcrumb.Separator>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {routeTitle || subName.replace("/", "")}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Button className="">
            <div className="buttonAlignment">
              <span className="material-symbols-rounded navBarNavigationIcon">
                add
              </span>
              New Sale
            </div>
          </Button>

          <Button type="link" className="sidebar-toggler" onClick={() => onPress()}>
            {toggler}
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Header;
