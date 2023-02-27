import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Breadcrumb, Button } from "antd";
import { useGetCustomerByIdQuery } from "../features/customer/customersAPI";
import SaleInvoicePopup from "../components/saleInvoice/SaleInvoicePopup";

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
  const [modalVisible, setModalVisible] = useState(false);
  const pathArray = subName.split("/");
  const { data: customer = {}, isLoading } = useGetCustomerByIdQuery(pathArray[1], {
    skip: !pathArray[1],
  });
  let firstPath = pathArray[0];
  let pageTitle = "";
  if (pathArray.length >= 2) {
    pageTitle = customer?.name;
  } else {
    pageTitle = pathArray[0];
  }

  useEffect(() => window.scrollTo(0, 0));

  // Trigger new invoice modal based on keyPress
  const handleKeyPress = useCallback((event: any) => {
    if (event.altKey === true && (event.key === "n" || event.key === "N")) {
      setModalVisible(true);
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb separator="">
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <Breadcrumb.Item>{`/ ${firstPath} /`}</Breadcrumb.Item>
            </Breadcrumb.Separator>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {pageTitle}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Button className="" onClick={() => setModalVisible(true)}>
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
      {modalVisible ? (
        <SaleInvoicePopup
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
    </>
  );
}

export default Header;
