import { Button, Form, FormInstance, Input, InputNumber, Row, Select } from "antd";
import { useState } from "react";
import classes from "./PaymentForm.module.css";

interface PFProps {
  form: FormInstance<any>;
  buyer?: any;
  onFinish: (values: any) => void;
  onCancel: () => void;
  submitButtonText?: string;
}

function PaymentForm({
  form,
  buyer,
  onFinish,
  onCancel,
  submitButtonText = "Save",
}: PFProps) {
  const [currentDue, setCurrentDue] = useState(buyer.dueAmount);

  const handlePaidChange = (value: number | null) => {
    if (value && value >= 0) {
      const newCurrentDue = buyer.dueAmount - value;
      setCurrentDue(newCurrentDue);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 12,
      }}
      initialValues={buyer}
      name="basic"
      onFinish={onFinish}
      autoComplete="on"
    >
      <Form.Item
        label="Buyer Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input Customer Name!",
          },
        ]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Previous Due"
        name="dueAmount"
        rules={[
          {
            required: true,
            message: "Previous due is required!",
          },
        ]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item label="Current Due">
        {/* This following div is required to prevent default form item rules  */}
        <div>
          <Input disabled value={currentDue} defaultValue={currentDue} />
        </div>
      </Form.Item>

      <Form.Item
        label="Payment"
        name="paid"
        rules={[
          {
            required: true,
            message: "Payment is required",
          },
          {
            type: "number",
            min: 0,
            message: "Payment can't be negative",
          },
        ]}
      >
        <InputNumber
          onChange={handlePaidChange}
          size="large"
          type="number"
          placeholder="Enter buyer payment"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Additional Notes" name="notes">
        <Input placeholder="Enter Additional notes" />
      </Form.Item>
      <Row justify="center">
        <div className={classes.actionButtons}>
          <Button ghost type="primary" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button
            type="primary"
            style={{ textTransform: "capitalize" }}
            htmlType="submit"
          >
            {submitButtonText}
          </Button>
        </div>
      </Row>
    </Form>
  );
}

export default PaymentForm;
