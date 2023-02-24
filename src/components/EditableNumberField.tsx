import React, { useEffect, useRef, useState } from "react";
import { Button, Col, InputNumber, Popover, Row } from "antd";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";

import classes from "./EditableNumberField.module.css";

type ENFProps = any;

function EditableNumberField({
  currentValue,
  record,
  handleSave,
  minValue,
  maxValue,
  placeholder,
  customFormatter,
  fieldKey,
  fieldNameForError,
  isRequired,
  isInputOnly,
}: ENFProps) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const [value, setValue] = useState<any>(null);
  const inputRef = useRef<any>(null);
  const errorTitle = fieldKey?.split(/(?=[A-Z])/).join(" ");

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleNumberChange = (newValue: any) => {
    if (error.isError) {
      setError({ ...error, isError: false });
    }
    setValue(newValue);
  };

  const handleEditMode = () => {
    setValue(currentValue);
    setEditing(true);
  };

  const save = () => {
    if (isRequired && !value) {
      setError({
        isError: true,
        message: `${fieldNameForError || errorTitle} is required`,
      });
      return;
    }
    if (value < 0) {
      setError({
        isError: true,
        message: `Negative ${fieldNameForError || errorTitle} is invalid`,
      });
      return;
    }
    if (minValue && value < minValue) {
      setError({
        isError: true,
        message: `${
          fieldNameForError || errorTitle
        } cannot be less than ${minValue}`,
      });
      return;
    }
    if (maxValue && value > maxValue) {
      setError({
        isError: true,
        message: `${
          fieldNameForError || errorTitle
        } cannot be greater than ${maxValue}`,
      });
      return;
    }
    handleSave({ ...record, [fieldKey]: value });
    setEditing(false);
  };

  return editing || isInputOnly ? (
    <Row justify="start" align="middle">
      <Col span={14}>
        <Popover
          visible={error.isError}
          content={error.message}
          overlayStyle={{ zIndex: 1000 }}
        >
          <InputNumber
            className={classes.numberInputField}
            type="number"
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            onPressEnter={save}
            onChange={handleNumberChange}
            onBlur={save}
          />
        </Popover>
      </Col>
      {!isInputOnly && (
        <Col span={4} offset={6}>
          <Button type="link" onClick={save}>
            <CheckOutlined />
          </Button>
        </Col>
      )}
    </Row>
  ) : (
    <div className="editable-cell-value-wrap">
      <Row justify="start" align="middle">
        <Col span={14}>
          {currentValue ? (
            <div>
              {customFormatter ? customFormatter(currentValue) : currentValue}
            </div>
          ) : (
            <InputNumber className={classes.numberInputField} disabled value={0} />
          )}
        </Col>
        <Col span={4} offset={6}>
          <Button type="link" onClick={handleEditMode}>
            <EditOutlined />
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default EditableNumberField;
