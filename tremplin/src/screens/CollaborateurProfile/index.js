import React from "react";
import cn from "classnames";
import styles from "./Home.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Overview from "./Overview";
import PopularTheme from "./PopularTheme";
import ProTips from "./ProTips";
import Listbenificier from "./Listbenificier";
  
const CollaborateurProfile = () => {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <Overview className={styles.card} />
           <ProTips className={styles.card} />
           <Listbenificier/>
        </div>
        <div className={styles.col}>
          <PopularTheme className={styles.card} views="4" />  
           
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default CollaborateurProfile;
