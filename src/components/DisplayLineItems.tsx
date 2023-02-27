import React from "react";
import { Link } from "react-router-dom";
import { formatBangladeshiCurrency } from "../utils/formatNumber";

type DLIProps = { lineItems: any };

function DisplayLineItems({ lineItems }: DLIProps) {
  return (
    <div>
      {lineItems.map((item: any) => (
        <p key={item.id}>
          <Link to={`/sellers/${item.sellerId}`}>{item.sellerName}</Link>
          {` : ${formatBangladeshiCurrency(item.rate)} * ${
            item.quantity
          } Kg = ${formatBangladeshiCurrency(item.subtotal)}`}
        </p>
      ))}
    </div>
  );
}

export default DisplayLineItems;
