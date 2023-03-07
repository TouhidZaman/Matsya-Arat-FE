import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Row } from "antd";
import { useState } from "react";
import { useGetSellerCustomersQuery } from "../../features/customer/customersAPI";
import AddCustomerModal from "../../components/customers/AddCustomerModal";

import classes from "./Customers.module.css";
import CustomersTable from "./SellersTable";

function AllSellers() {
  const { data: sellers = [], isLoading } = useGetSellerCustomersQuery(true); //need to adjust this
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  let filteredSellers = [];

  //Applying search filtering
  if (search) {
    let keywordsArray = search.split(" ");
    filteredSellers = sellers.filter((customer: any) =>
      keywordsArray.some(
        (keyword) =>
          customer.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          customer.phone?.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  } else {
    filteredSellers = sellers;
  }

  return (
    <section className={classes.customers}>
      <Row justify={"space-between"} className={classes.actions}>
        <Button
          className={classes.addButton}
          type="primary"
          icon={<PlusOutlined style={{ color: "black" }} />}
          onClick={() => setModalVisible(true)}
        >
          New Seller
        </Button>
        <Input
          placeholder="Search Seller"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Row>
      <CustomersTable customers={filteredSellers} loading={isLoading} />
      {modalVisible && (
        <AddCustomerModal
          modalVisible={modalVisible}
          customerType="seller"
          setModalVisible={setModalVisible}
          customers={sellers}
        />
      )}
    </section>
  );
}

export default AllSellers;
