import React from "react";
import { formatBangladeshiCurrency } from "src/utils/formatNumber";

type DLIProps = { lineItems: any };

function DisplayLineItems({ lineItems }: DLIProps) {
  return (
    <div>
      {lineItems.map((item: any) => (
        <p key={item.id}>
          {`${item.product_name} * ${formatBangladeshiCurrency(item.rate)} * ${
            item.quantity
          } Litres = ${formatBangladeshiCurrency(item.subtotal)}`}
        </p>
      ))}
    </div>
  );
}

export default DisplayLineItems;
