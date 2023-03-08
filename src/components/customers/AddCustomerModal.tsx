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
  customers: any;
}

function AddCustomerModal({
  modalVisible,
  customerType,
  setModalVisible,
  customers,
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

  const handleVerifyCustomer = (customer: any) => {
    //will store boolean value only
    return !!customers?.find(
      (c: any) =>
        c?.name?.replaceAll(" ", "")?.toLowerCase() ===
        customer?.name?.replaceAll(" ", "")?.toLowerCase()
    );
  };

  const handleAddCustomer = (customer: any) => {
    //checking name length
    if (customer?.name?.length > 20) {
      toast.error(`${customerType} name more then 20 characters is not allowed`, {
        id: "customer-length",
      });
      return;
    }

    const isCustomerExist = handleVerifyCustomer(customer);
    if (isCustomerExist) {
      toast.error(`${customerType} already exist, try different name`, {
        id: "customer-exist",
      });
      return;
    }
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
