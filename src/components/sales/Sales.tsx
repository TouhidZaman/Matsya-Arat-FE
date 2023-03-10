import React, { useEffect, useState } from "react";
import { Input, Row, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import classes from "./Sales.module.css";
import { getFormattedDate } from "../../utils/formatDate";
import type { DatePickerProps } from "antd";
import SalesTable from "./SalesTable";

type BSProps = {
  sales: any[];
  isLoading: boolean;
  title: string;
};

const Sales = ({ sales, isLoading, title }: BSProps) => {
  const [search, setSearch] = useState("");
  const [dateWiseSales, setDateWiseSales] = useState(sales);
  let searchFilteredSales = [];

  //setting sales into date wise sales
  useEffect(() => {
    setDateWiseSales(sales);
  }, [sales]);

  //Date Filtering
  const handleDateChange: DatePickerProps["onChange"] = (date: any, dateString) => {
    console.log(date, dateString, "from date selector");
    let dateFiltered: any = [];
    if (dateString) {
      if (sales.length > 0) {
        sales.forEach((sale: any) => {
          if (dateString === getFormattedDate(new Date(sale.date))) {
            dateFiltered.push(sale);
          }
        });
        setDateWiseSales(dateFiltered);
      }
    } else {
      setDateWiseSales(sales);
    }
  };

  //Applying search filtering
  if (search) {
    let keywordsArray = search.split(" ");
    searchFilteredSales = dateWiseSales.filter((sale: any) =>
      keywordsArray.some(
        (keyword) =>
          sale.buyerName?.toLowerCase().includes(keyword.toLowerCase()) ||
          getFormattedDate(new Date(sale.date)).includes(keyword)
      )
    );
  } else {
    searchFilteredSales = dateWiseSales;
  }

  return (
    <section className={classes.sales}>
      <Row justify={"space-between"} className={classes.actions}>
        <Input
          placeholder="Search Sales using buyer or date"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DatePicker size="small" onChange={handleDateChange} format={"DD/MM/YYYY"} />
      </Row>
      <SalesTable sales={searchFilteredSales} loading={isLoading} title={title} />
    </section>
  );
};

export default Sales;
