import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Row } from "antd";
import { useGetCustomersQuery } from "../../features/customer/customersAPI";

import classes from "./Customers.module.css";
import CustomersTable from "./CustomersTable";

function AllCustomers() {
  const { data: customers = [], isLoading } = useGetCustomersQuery(true); //need to adjust this
  return (
    <section className={classes.customers}>
      <Row justify={"space-between"} className={classes.actions}>
        <Button
          className={classes.addButton}
          type="primary"
          icon={<PlusOutlined style={{ color: "black" }} />}
        >
          New Customer
        </Button>
        <Input placeholder="Search Customer" prefix={<SearchOutlined />} />
      </Row>
      <CustomersTable customers={customers} loading={isLoading} />
    </section>
  );
}

export default AllCustomers;
