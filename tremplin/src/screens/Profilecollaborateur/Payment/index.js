import React from "react";
import cn from "classnames";
import styles from "./Payment.module.sass";
import Item from "../Item";
import Tooltip from "../../../components/Tooltip";

const Payment = ({ className }) => {
  return (
    <Item
      className={cn(styles.card, className)}
      title="Informations Complémentaires"
      classTitle="title-blue"
    >
      <div className={styles.line}>
        <div className={styles.title}>
          
          <Tooltip
            className={styles.tooltip}
            title="Small description"
            icon="info"
            place="top"
          />
        </div>
        <button className={cn("button-stroke button-small", styles.button)}>
          Update
        </button>
      </div>
      <div className={styles.email}>Informations Complémentaires</div>
      <div className={styles.content}>
        les autres informations
      </div>
    </Item>
  );
};

export default Payment;
