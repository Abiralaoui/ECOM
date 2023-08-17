import React, { useState } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import Item from "./Item";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";

import Chart from "./Chart";
import  Chartcoaching from "./Chartcoaching";

const intervals = ["Tous les temps", "Par an", "Par mois"];
const nav = [
  {
    title: " mentorat",
    counter: "1024",
    icon: "activity",
    color: "#8AB9F1",
    value: 12.8,
  },
  {
    title: " coaching",
    counter: "253",
    icon: "activity",
    color: "#B1E5FC",
    value: 22.8,
  },
  
];

const Overview = ({ className }) => {
  const [sorting, setSorting] = useState(intervals[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Card
      className={cn(styles.card, className)}
      title=" coaching-mentorat"
      classTitle="title-blue"
      head={
        <Dropdown
          className={styles.dropdown}
          classDropdownHead={styles.dropdownHead}
          value={sorting}
          setValue={setSorting}
          options={intervals}
          small
        />
      }
    >
      <div className={styles.overview}>
        <div className={styles.nav}>
          {nav.map((x, index) => (
            <Item
              className={cn(styles.item, {
                [styles.active]: index === activeIndex,
              })}
              key={index}
              onActive={() => setActiveIndex(index)}
              item={x}
            />
          ))}
        </div>
        <div className={styles.body}>
          {activeIndex === 1 && <> <Chart /></>}
          {activeIndex === 0 && <Chartcoaching />}
        </div>
      </div>
    </Card>
  );
};

export default Overview;
