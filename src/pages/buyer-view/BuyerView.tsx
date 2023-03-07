import React from "react";

import CustomerTopView from "../../components/customers/CustomerTopView";
import TabsView, { Tab } from "../../components/tabs-view/TabsView";
import classes from "./BuyerView.module.css";

const BUYER_TABS: Tab[] = [
  { displayName: "Buyer Sales", path: "sales" },
  { displayName: "Credit Payments", path: "credit-payments" },
];

const BuyerView = () => {
  return (
    <section className={classes.buyerView}>
      <CustomerTopView customerType="buyer" />
      <TabsView tabs={BUYER_TABS} />
    </section>
  );
};

export default BuyerView;
