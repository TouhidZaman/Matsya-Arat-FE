import React, { forwardRef } from "react";
import ReactToPrint from "react-to-print";

import pageHeader from "../../assets/images/page-header.png";
import classes from "./PrintMe.module.css";

type PMProps = {
  title: string;
  children: React.ReactNode;
};

const PrintMe = forwardRef(({ title, children }: PMProps, ref: any) => (
  <ReactToPrint bodyClass={classes.page} ref={ref} content={() => ref.current}>
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <img
          src={pageHeader}
          // src="https://necs.com/knowledgebase/invoice-header.png"
          alt="Heading-area"
        />
      </div>
      {title ? <h3 className={classes.printTitle}>{title}</h3> : null}
      {children}
    </div>
  </ReactToPrint>
));

export default PrintMe;
