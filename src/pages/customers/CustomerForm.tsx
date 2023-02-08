import { Button, Form, FormInstance, Input, Row, Select } from "antd";
import { REGEX_PATTERNS } from "../../utils/constants";
import classes from "./CustomerForm.module.css";

function CustomerForm({
  form,
  initialValues,
  onFinish,
  onCancel,
  submitButtonText = "Save",
}: {
  form: FormInstance<any>;
  initialValues?: any;
  onFinish: (values: any) => Promise<void>;
  onCancel: () => void;
  submitButtonText?: string;
}) {
  return (
    <Form
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 12,
      }}
      initialValues={initialValues}
      name="basic"
      onFinish={onFinish}
      autoComplete="on"
    >
      <Form.Item
        label="Customer Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input Customer Name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type of Customer"
        name="type"
        rules={[
          {
            required: true,
            message: "Please Chose type of company",
          },
        ]}
      >
        <Select allowClear className={classes.selectInputField}>
          <Select.Option value="buyer">Buyer</Select.Option>
          <Select.Option value="seller">Seller</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Contact Number"
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your Contact Number",
          },
          {
            pattern: REGEX_PATTERNS.phone,
            message: "Please input valid Bangladeshi Phone",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email ID"
        name="email_address"
        rules={[
          {
            pattern: REGEX_PATTERNS.email,
            message: "Please input valid Email Address",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Please input your Address",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Row justify="center">
        <div className={classes.actionButtons}>
          <Button ghost type="primary" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {submitButtonText}
          </Button>
        </div>
      </Row>
    </Form>
  );
}

export default CustomerForm;
