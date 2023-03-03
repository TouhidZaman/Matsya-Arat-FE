import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row, Space, Popover, Spin } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  TransactionOutlined,
} from "@ant-design/icons";

import classes from "./CustomerTopView.module.css";
import { useGetCustomerByIdQuery } from "../../features/customer/customersAPI";
import { formatBangladeshiCurrency } from "../../utils/formatNumber";
import UpdateCustomerModal from "./UpdateCustomerModal";

type CTVProps = {
  customerType: string;
};

const CustomerTopView = ({ customerType }: CTVProps) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  const customerId = customerType === "buyer" ? params.buyerId : params.sellerId;

  const { data: buyer = {}, isLoading: buyerLoading } = useGetCustomerByIdQuery(
    customerId!,
    { skip: !customerId }
  );

  const shoEditModal = (customer: any) => {
    setCustomerInfo(customer);
    setEditModalVisible(true);
  };

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Space direction="vertical">
            <Space>
              <ArrowLeftOutlined
                className={classes.backButton}
                onClick={() =>
                  navigate(customerType === "buyer" ? "/buyers" : "/sellers")
                }
              />
              <span className={classes.title}>
                {buyerLoading ? <Spin>buyer name</Spin> : buyer.name}
              </span>
              <span className={classes.customBadge}>{customerType}</span>
            </Space>
            {!buyerLoading && customerType === "buyer" ? (
              <Space className={classes.dueAmount}>
                <TransactionOutlined />{" "}
                <span>
                  Due Amount: {formatBangladeshiCurrency(buyer?.dueAmount || 0)}
                </span>
              </Space>
            ) : null}
          </Space>
        </Col>
        <Col>
          <Space>
            <Popover
              overlayStyle={{ zIndex: 1000 }}
              placement="bottom"
              content="Edit buyer"
            >
              <button
                type="button"
                onClick={() => shoEditModal(buyer)}
                className={classes.actionButton}
              >
                <EditOutlined />
              </button>
            </Popover>
          </Space>
        </Col>
      </Row>
      {editModalVisible ? (
        <UpdateCustomerModal
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
          customerInfo={customerInfo}
        />
      ) : null}
    </>
  );
};

export default CustomerTopView;
