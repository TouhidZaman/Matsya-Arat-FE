import React from "react";
import { Form, Modal } from "antd";

import CustomerForm from "./CustomerForm";
import classes from "./SharedStyles.module.css";

function AddCustomerModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}) {
  const [form] = Form.useForm();

  const handleAddCustomer = async (values: any) => {};

  const handleCancel = () => {
    form.resetFields();
    setModalVisible(false);
  };

  return (
    <Modal
      centered
      visible={modalVisible}
      footer={null}
      onCancel={() => setModalVisible(false)}
      width={700}
    >
      <div>
        <h2 className={classes.hoverTitle}>Add New Customer</h2>
        <CustomerForm
          form={form}
          onFinish={handleAddCustomer}
          submitButtonText="Save Customer"
          onCancel={handleCancel}
        />
      </div>
    </Modal>
  );
}

export default AddCustomerModal;
