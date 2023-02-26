import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Form, Modal } from "antd";

import CustomerForm from "./CustomerForm";
import classes from "./SharedStyles.module.css";
import { useUpdateCustomerMutation } from "../../features/customer/customersAPI";

function UpdateCustomerModal({
  modalVisible,
  setModalVisible,
  customerInfo,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  customerInfo: any;
}) {
  const [form] = Form.useForm();
  const [patchCustomer, { isSuccess, isError }] = useUpdateCustomerMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Customer updated successfully");
    } else if (isError) {
      toast.error("Failed to update customer");
    }
  }, [isSuccess, isError]);

  const handleCustomerUpdate = (updatedCustomer: any) => {
    patchCustomer({ updatedCustomer, customerId: customerInfo._id });
  };

  const handleCancel = () => {
    form.resetFields();
    setModalVisible(false);
  };

  return (
    <Modal
      centered
      open={modalVisible}
      footer={null}
      onCancel={() => setModalVisible(false)}
      width={750}
    >
      <div>
        <h2 className={classes.hoverTitle}>
          {`Update Customer ${customerInfo.name}`}
        </h2>
        <CustomerForm
          form={form}
          initialValues={customerInfo}
          onFinish={handleCustomerUpdate}
          onCancel={handleCancel}
          submitButtonText="Update customer"
        />
      </div>
    </Modal>
  );
}

export default UpdateCustomerModal;
