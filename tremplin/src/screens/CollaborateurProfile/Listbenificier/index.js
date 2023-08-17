import React, { useState } from "react";
import styles from "./CustomerList.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Table from "./Table";
import Details from "./Details";


const Listbenificier = () => {
  
  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <>
      <Card
        className={styles.card}
        title="Liste bénéficiaires"
        classTitle={cn("title-blue", styles.title)}
        classCardHead={cn(styles.head, { [styles.hidden]: visible })}
        head={
          <>
           
          </>
        }
      >
        <div className={cn(styles.row, { [styles.flex]: visible })}>
          <Table
            className={styles.table}
            activeTable={visible}
            setActiveTable={setVisible}
          />
          <Details
            className={styles.details}
            onClose={() => setVisible(false)}
          />
        </div>
      </Card>
    
    </>
  );
};

export default Listbenificier;
