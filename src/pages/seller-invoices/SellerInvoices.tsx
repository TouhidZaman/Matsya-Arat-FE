import React, { useEffect, useState } from "react";
import { Input, Row, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import classes from "./SellerInvoices.module.css";
import SellerInvoiceTable from "./SellerInvoiceTable";
import {
  useGetSalesBySellerIdQuery,
  useGetSalesQuery,
} from "../../features/saleInvoice/saleInvoicesAPI";
import { getFormattedDate } from "../../utils/formatDate";
import type { DatePickerProps } from "antd";
import { useParams } from "react-router-dom";

const SellerInvoices = () => {
  const { sellerId } = useParams();
  const { data: salesBySeller, isLoading } = useGetSalesBySellerIdQuery(sellerId);
  const [search, setSearch] = useState("");
  const [dateWiseSales, setDateWiseSales] = useState(salesBySeller);
  let searchFilteredSales = [];

  //setting sales into date wise sales
  useEffect(() => {
    setDateWiseSales(salesBySeller);
  }, [salesBySeller]);

  //Date Filtering
  const handleDateChange: DatePickerProps["onChange"] = (date: any, dateString) => {
    console.log(date, dateString, "from date selector");
    let dateFiltered: any = [];
    if (dateString) {
      if (salesBySeller.length > 0) {
        salesBySeller.forEach((saleDate: any) => {
          if (dateString === getFormattedDate(new Date(saleDate._id))) {
            dateFiltered.push(saleDate);
          }
        });
        setDateWiseSales(dateFiltered);
      }
    } else {
      setDateWiseSales(salesBySeller);
    }
  };

  //Applying search filtering
  if (search) {
    let keywordsArray = search.split(" ");
    searchFilteredSales = dateWiseSales.filter((sale: any) =>
      keywordsArray.some(
        (keyword) =>
          sale.salesByDate.some((item: any) =>
            item?.buyerName?.toLowerCase().includes(keyword.toLowerCase())
          ) || getFormattedDate(new Date(sale._id)).includes(keyword)
      )
    );
  } else {
    searchFilteredSales = dateWiseSales;
  }

  return (
    <section className={classes.customers}>
      <Row justify={"space-between"} className={classes.actions}>
        <Input
          placeholder="Search sales using buyer or date"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DatePicker size="small" onChange={handleDateChange} format={"DD/MM/YYYY"} />
      </Row>

      {searchFilteredSales?.map((salesGroup: any, index: number) => {
        console.log(salesGroup?.salesByDate, "salesByDate");
        return salesGroup?.salesByDate ? (
          <SellerInvoiceTable
            key={index}
            loading={isLoading}
            salesByDate={salesGroup.salesByDate}
            title={salesGroup._id}
          />
        ) : null;
      })}
    </section>
  );
};

export default SellerInvoices;
