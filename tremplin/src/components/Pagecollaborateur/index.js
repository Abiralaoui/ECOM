import React, { useState } from "react";
import cn from "classnames";
import styles from "./Page.module.sass";
import Sidebarcollaborateur from "../Sidebarcollaborateur";

import Header from "../Header";

const Pagecollaborateur = ({ wide, children, title }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className={styles.page}>
        <Sidebarcollaborateur
          className={cn(styles.sidebar, { [styles.visible]: visible })}
          onClose={() => setVisible(false)}
        />
        <Header onOpen={() => setVisible(true)} />
        <div className={styles.inner}>
          <div
            className={cn(styles.container, {
              [styles.wide]: wide,
            })}
          >
            {title && <div className={cn("h3", styles.title)}>{title}</div>}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagecollaborateur;

