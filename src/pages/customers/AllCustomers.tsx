import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Row } from "antd";
import { useState } from "react";
import { useGetCustomersQuery } from "../../features/customer/customersAPI";
import AddCustomerModal from "./AddCustomerModal";

import classes from "./Customers.module.css";
import CustomersTable from "./CustomersTable";

function AllCustomers() {
  const { data: customers = [], isLoading } = useGetCustomersQuery(true); //need to adjust this
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <section className={classes.customers}>
      <Row justify={"space-between"} className={classes.actions}>
        <Button
          className={classes.addButton}
          type="primary"
          icon={<PlusOutlined style={{ color: "black" }} />}
          onClick={() => setModalVisible(true)}
        >
          New Customer
        </Button>
        <Input placeholder="Search Customer" prefix={<SearchOutlined />} />
      </Row>
      <CustomersTable customers={customers} loading={isLoading} />
      {modalVisible && (
        <AddCustomerModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </section>
  );
}

export default AllCustomers;
