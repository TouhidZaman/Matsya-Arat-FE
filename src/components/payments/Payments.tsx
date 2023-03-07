import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Row, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import classes from "./Payments.module.css";
import { getFormattedDate } from "../../utils/formatDate";
import type { DatePickerProps } from "antd";
import PaymentsTable from "../../components/payments/PaymentsTable";

interface PaymentsProps {
  payments: any;
  isLoading: boolean;
  title: string;
}

const Payments = ({ payments, isLoading, title }: PaymentsProps) => {
  const [search, setSearch] = useState("");
  const [dateWisePayments, setDateWisePayments] = useState(payments);
  let searchFilteredSales = [];

  //setting sales into date wise sales
  useEffect(() => {
    setDateWisePayments(payments);
  }, [payments]);

  //Date Filtering
  const handleDateChange: DatePickerProps["onChange"] = (date: any, dateString) => {
    let dateFiltered: any = [];
    if (dateString) {
      if (payments.length > 0) {
        payments.forEach((payment: any) => {
          if (dateString === getFormattedDate(new Date(payment.createdAt))) {
            dateFiltered.push(payment);
          }
        });
        setDateWisePayments(dateFiltered);
      }
    } else {
      setDateWisePayments(payments);
    }
  };

  //Applying search filtering
  if (search) {
    let keywordsArray = search.split(" ");
    searchFilteredSales = dateWisePayments.filter((sale: any) =>
      keywordsArray.some(
        (keyword) =>
          sale.buyerName?.toLowerCase().includes(keyword.toLowerCase()) ||
          getFormattedDate(new Date(sale.createdAt)).includes(keyword)
      )
    );
  } else {
    searchFilteredSales = dateWisePayments;
  }

  return (
    <section className={classes.payments}>
      <Row justify={"space-between"} className={classes.actions}>
        <Input
          placeholder="Search payments using buyer or date"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DatePicker size="small" onChange={handleDateChange} format={"DD/MM/YYYY"} />
      </Row>
      <PaymentsTable
        payments={searchFilteredSales}
        loading={isLoading}
        title={title}
      />
    </section>
  );
};

export default Payments;
