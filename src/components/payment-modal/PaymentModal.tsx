import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Form, Modal } from "antd";

import classes from "./PaymentModal.module.css";
import PaymentForm from "./PaymentForm";
import { useCreatePaymentMutation } from "../../features/payment/paymentsAPI";

interface PaymentModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  buyer: any;
}

function PaymentModal({ modalVisible, setModalVisible, buyer }: PaymentModalProps) {
  const [form] = Form.useForm();
  const [payNow, { isLoading, isSuccess, isError }] = useCreatePaymentMutation();
  console.log(isLoading, "isLoading", isSuccess, "isSuccess", isError, "isError");

  useEffect(() => {
    if (isSuccess) {
      toast.success("Payment added successfully");
      setModalVisible(false);
    } else if (isError) {
      toast.error("Oops !Failed to add payment");
    }
  }, [isSuccess, isError]);

  const handlePayment = (payment: any) => {
    if (payment.paid && payment.dueAmount) {
      const createdAt = new Date();
      const dueAfterPayment = buyer.dueAmount - payment.paid;
      const newPayment = {
        buyerName: buyer.name,
        buyerId: buyer._id,
        previousDue: buyer.dueAmount,
        paid: payment.paid,
        currentDue: dueAfterPayment,
        createdAt,
      };
      console.log(newPayment, "newPayment");
      payNow(newPayment);
      form.resetFields();
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
        <h2 className={classes.hoverTitle}>Buyer Credit Payment</h2>
        <PaymentForm
          form={form}
          buyer={buyer}
          onFinish={handlePayment}
          onCancel={handleCancel}
          submitButtonText="Make Payment"
        />
      </div>
    </Modal>
  );
}

export default PaymentModal;
