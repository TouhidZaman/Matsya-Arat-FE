import React, { useState } from "react";
import { Button, Divider, Select, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import classes from "./SearchableSelectField.module.css";

const { Option } = Select;

type SSFProps = any;

function SearchableSelectField({
  selectOptions,
  optionKey,
  optionLabelKey,
  onSelectChange,
  placeholder,
  value,
  disabled,
  loading,
  addItemText,
  handleAddItem,
  enableTextInput,
  width,
}: SSFProps) {
  const [searchValue, setSearchValue] = useState("");
  const getSelectedOption = (key: any) =>
    selectOptions.find((option: any) => option[optionKey] === key);

  const addNewItem = (menu: any) => (
    <>
      {menu}
      <Divider
        style={{
          margin: "2px 0",
        }}
      />
      <Button type="link" icon={<PlusOutlined />} onClick={handleAddItem}>
        {addItemText || "Add New Item"}
      </Button>
    </>
  );

  const handleSearch = (newSearchValue: any) => {
    setSearchValue(newSearchValue);
  };

  const handleEnterKey = (event: any) => {
    if ((event.key === "Enter" || event.keyCode === 13) && searchValue) {
      const optionExist = selectOptions.find(
        (option: any) =>
          option[optionLabelKey].toLowerCase() === searchValue.toLocaleLowerCase()
      );

      if (!optionExist) {
        const newOption = {
          [optionKey]: searchValue,
          [optionLabelKey]: searchValue,
          editable: true,
        };
        onSelectChange(newOption);
      }
    }
  };

  return (
    <Select
      className={classes.selectInputField}
      disabled={disabled}
      value={value}
      showSearch
      onSearch={enableTextInput ? handleSearch : undefined}
      onInputKeyDown={handleEnterKey}
      style={{
        width: width || 200,
      }}
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={(key) => onSelectChange(getSelectedOption(key))}
      filterOption={(input: any, option: any): any => {
        let match: any = "";
        match = option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        return match;
      }}
      filterSort={(optionA, optionB) =>
        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
      }
      notFoundContent={loading ? <Spin size="small" /> : <span>Not Found</span>}
      dropdownRender={(menu) => (handleAddItem ? addNewItem(menu) : menu)}
    >
      {selectOptions.map((option: any) => (
        <Option key={option[optionKey]} value={option[optionKey]}>
          {option[optionLabelKey]}
        </Option>
      ))}
    </Select>
  );
}

export default SearchableSelectField;
