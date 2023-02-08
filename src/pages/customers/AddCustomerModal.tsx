import { Form, Modal } from "antd";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import CustomerForm from "./CustomerForm";
import classes from "./SharedStyles.module.css";
import { useCreateCustomerMutation } from "../../features/customer/customersAPI";

function AddCustomerModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}) {
  const [form] = Form.useForm();
  const [addCustomer, { isSuccess, isError }] = useCreateCustomerMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Customer added successfully");
      form.resetFields();
    } else if (isError) {
      toast.error("Failed to add customer");
    }
  }, [isSuccess, isError]);

  const handleAddCustomer = (customer: any) => addCustomer(customer);

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
