import { Form, Modal } from "antd";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import CustomerForm from "./CustomerForm";
import classes from "./SharedStyles.module.css";
import { useCreateCustomerMutation } from "../../features/customer/customersAPI";

interface ACMProps {
  modalVisible: boolean;
  customerType: string;
  setModalVisible: (value: boolean) => void;
}

function AddCustomerModal({
  modalVisible,
  customerType,
  setModalVisible,
}: ACMProps) {
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

  const handleAddCustomer = (customer: any) => {
    const createdAt = new Date();
    if (customerType === "buyer") {
      addCustomer({ ...customer, dueAmount: 0, type: customerType, createdAt });
    } else {
      addCustomer({ ...customer, type: customerType, createdAt });
    }
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
      width={700}
    >
      <div>
        <h2 className={classes.hoverTitle}>Add New {customerType}</h2>
        <CustomerForm
          form={form}
          onFinish={handleAddCustomer}
          submitButtonText={`Save ${customerType}`}
          onCancel={handleCancel}
        />
      </div>
    </Modal>
  );
}

export default AddCustomerModal;
