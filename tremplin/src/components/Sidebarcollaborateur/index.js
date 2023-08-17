import React, { useState } from "react";
import styles from "./Sidebar.module.sass";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Dropdown from "./Dropdown";
import Help from "./Help";
import Image from "../Image";

const navigation = [
  {
    title: "Tableau de bord",
    icon: "home",
    url: "/shop",
  },
    
  {
    title: "Profils inscrits",
    slug: "customers",
    icon: "profile-circle",
    dropdown: [
      {
        title: " coaching",
        url: "/customers/overview",
      },
      {
        title: "mentorat",
        url: "/customers/customer-list",
      },
    ],
  },
  
  {
    title: "Calendrier",
    slug: "income",
    icon: "calendar",
    dropdown: [
      {
        title: "Entretien",
        url: "/income/earning",
      },
      {
        title: "Evenement",
        url: "/income/refunds",
      },
      
    ],
  },
  {
    title: "Statistiques",
    slug: "Statistiques",
    icon: "leaderboard",
    dropdown: [
      {
        title: " Coaching Réalisés",
        url: "/customers/overview",
        counter: "1",
        colorCounter: "#B5E4CA",
      },
      {
        title: " Coaching en Cours",
        url: "/customers/customer-list",
        counter: "2",
        colorCounter: "#FFBC99"
      },
      {
        title: " Mentorat en Cours",
        url: "/customers/customer-list",
        counter: "6",
        colorCounter: "#FFBC99"
      },
    ],
  },
  {
    title: "Domaines de coaching",
    icon: "list",
    url: "/enregistrement",
  },
];

const Sidebarcollaborateur = ({ className, onClose }) => {
  const [visibleHelp, setVisibleHelp] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        className={cn(styles.sidebar, className, { [styles.active]: visible })}
      >
        <button className={styles.close} onClick={onClose}>
          <Icon name="close" size="24" />
        </button>
        <Link className={styles.logo} to="/" onClick={onClose}>
          <Image
            className={styles.pic}
            src="/images/logo-dark.png"
            srcDark="/images/logo-light.png"
            alt="Core"
          />
        </Link>
        <div className={styles.menu}>
          {navigation.map((x, index) =>
            x.url ? (
              <NavLink
                className={styles.item}
                activeClassName={styles.active}
                to={x.url}
                key={index}
                exact
                onClick={onClose}
              >
                <Icon name={x.icon} size="24" />
                {x.title}
              </NavLink>
            ) : (
              <Dropdown
                className={styles.dropdown}
                visibleSidebar={visible}
                setValue={setVisible}
                key={index}
                item={x}
                onClose={onClose}
              />
            )
          )}
        </div>
        <button className={styles.toggle} onClick={() => setVisible(!visible)}>
          <Icon name="arrow-right" size="24" />
          <Icon name="close" size="24" />
        </button>
        <div className={styles.foot}>
          <button className={styles.link} onClick={() => setVisibleHelp(true)}>
            <Icon name="help" size="24" />
            Help & getting started
            <div className={styles.counter}>8</div>
          </button>
          <Theme className={styles.theme} visibleSidebar={visible} />
        </div>
      </div>
      <Help
        visible={visibleHelp}
        setVisible={setVisibleHelp}
        onClose={onClose}
      />
      <div
        className={cn(styles.overlay, { [styles.active]: visible })}
        onClick={() => setVisible(false)}
      ></div>
    </>
  );
};

export default Sidebarcollaborateur;
