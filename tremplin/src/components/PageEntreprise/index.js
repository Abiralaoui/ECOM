import React, { useState } from "react";
import cn from "classnames";
import styles from "./Page.module.sass";
import SidebarEntreprise from "../SidebarEntreprise";
import Header from "../Header";

const PageEntreprise = ({ wide, children, title }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className={styles.page}>
        <SidebarEntreprise
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

export default PageEntreprise;
