import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Row } from "antd";
import { useState } from "react";
import { useGetBuyerCustomersQuery } from "../../features/customer/customersAPI";
import AddCustomerModal from "../../components/customers/AddCustomerModal";

import classes from "./Customers.module.css";
import BuyersTable from "./BuyersTable";

function AllBuyers() {
  const { data: buyers = [], isLoading } = useGetBuyerCustomersQuery(true); //need to adjust this
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  let filteredBuyers = [];

  //Applying search filtering
  if (search) {
    let keywordsArray = search.split(" ");
    filteredBuyers = buyers.filter((customer: any) =>
      keywordsArray.some(
        (keyword) =>
          customer.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          customer.phone?.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  } else {
    filteredBuyers = buyers;
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
          New Buyer
        </Button>
        <Input
          placeholder="Search Buyer"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Row>
      <BuyersTable customers={filteredBuyers} loading={isLoading} />
      {modalVisible && (
        <AddCustomerModal
          modalVisible={modalVisible}
          customerType="buyer"
          setModalVisible={setModalVisible}
        />
      )}
    </section>
  );
}

export default AllBuyers;
