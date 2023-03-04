import React, { useState } from "react";
import { Space } from "antd";
import SearchableSelectField from "./SearchableSelectField";
import AddCustomerModal from "./customers/AddCustomerModal";

type CSSProps = {
  customers: any[];
  handleCustomerChange: (c: any) => void;
  selectedCustomer: any;
  loading: boolean;
  refetch: any;
  setAutoSelect: (p: boolean) => void;
};

function CustomerSearchSelect({
  customers,
  handleCustomerChange,
  selectedCustomer,
  loading,
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
        loading={loading}
      />
      {customerModalVisible && (
        <AddCustomerModal
          modalVisible={customerModalVisible}
          customerType={"buyer"}
          setModalVisible={setCustomerModalVisible}
          // handleCustomerCreated={handleVehicleCreated}
        />
      )}
    </Space>
  );
}

export default CustomerSearchSelect;
