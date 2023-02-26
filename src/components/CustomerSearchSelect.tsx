import React, { useState } from "react";
import { Space } from "antd";
import SearchableSelectField from "./SearchableSelectField";
import AddCustomerModal from "./customers/AddCustomerModal";

type CSSProps = any;

function CustomerSearchSelect({
  customers,
  handleCustomerChange,
  selectedCustomer,
  customerLoading,
  refetch,
  setAutoSelect,
}: CSSProps) {
  const [customerModalVisible, setCustomerModalVisible] = useState(false);
  const handleVehicleCreated = (newCustomer: any) => {
    setAutoSelect(false); // preventing auto select customer  on individual customer
    refetch(); // refetching customers again
    handleCustomerChange(newCustomer);
  };
  return (
    <Space direction="vertical">
      <span>Buyer Name</span>
      <SearchableSelectField
        // disabled={!selectedCustomer?.id}
        selectOptions={customers}
        optionKey="_id"
        optionLabelKey="name"
        onSelectChange={(customer: any) => handleCustomerChange(customer)}
        placeholder="Select/Add New"
        value={selectedCustomer?._id}
        handleAddItem={() => setCustomerModalVisible(true)}
        addItemText="Add New Customer"
        loading={customerLoading}
      />
      {customerModalVisible && (
        <AddCustomerModal
          modalVisible={customerModalVisible}
          setModalVisible={setCustomerModalVisible}
          // handleCustomerCreated={handleVehicleCreated}
        />
      )}
    </Space>
  );
}

export default CustomerSearchSelect;
