import React from "react";
import { Form, Modal } from "antd";

import CustomerForm from "./CustomerForm";
import classes from "./SharedStyles.module.css";

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

  const handleCustomerUpdate = async (values: any) => {};

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
