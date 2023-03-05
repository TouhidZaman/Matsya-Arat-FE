import { useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Row } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useGetBuyerCustomersQuery } from "../../features/customer/customersAPI";
import AddCustomerModal from "../../components/customers/AddCustomerModal";

import classes from "./Customers.module.css";
import BuyersTable from "./BuyersTable";

function AllBuyers() {
  const [dueSort, setDueSort] = useState(false);
  const { data: buyers = [], isLoading } = useGetBuyerCustomersQuery(
    dueSort ? "&sortBy=dueAmount" : ""
  );
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

  const handleChecked = (e: CheckboxChangeEvent) => setDueSort(e.target.checked);

  return (
    <section className={classes.customers}>
      <Row justify={"space-between"} align="middle" className={classes.actions}>
        <Button
          className={classes.addButton}
          type="primary"
          icon={<PlusOutlined style={{ color: "black" }} />}
          onClick={() => setModalVisible(true)}
        >
          New Buyer
        </Button>
        <Row justify="end" align="middle" className={classes.subActions}>
          <Input
            placeholder="Search Buyer"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: "15px" }}
          />
          <Checkbox onChange={handleChecked} style={{ fontWeight: "bolder" }}>
            Sort by Due
          </Checkbox>
        </Row>
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
