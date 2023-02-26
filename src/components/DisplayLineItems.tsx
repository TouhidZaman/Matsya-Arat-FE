import React from "react";
import { formatBangladeshiCurrency } from "../utils/formatNumber";

type DLIProps = { lineItems: any };

function DisplayLineItems({ lineItems }: DLIProps) {
  return (
    <div>
      {lineItems.map((item: any) => (
        <p key={item.id}>
          {`${item.sellerName}: ${formatBangladeshiCurrency(item.rate)} * ${
            item.quantity
          } Kg = ${formatBangladeshiCurrency(item.subtotal)}`}
        </p>
      ))}
    </div>
  );
}

export default DisplayLineItems;
