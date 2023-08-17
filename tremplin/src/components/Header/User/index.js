import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import supabase from '../../../utils/supabase'

const items = [
  {
    menu: [
      {
        title: "Profile",
        url: "/settings/collaborateur ",
      },
      {
        title: "Edit profile",
        url: "/settings/collaborateur",
      },
    ],
  },
  
  
  {
    menu: [
      
      {
        title: "Log out",
        onClick: async (e) => {
          supabase.auth.signOut();
        }
      },
    ],
  },
];

const User = ({ className }) => {
  const [visible, setVisible] = useState(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className, { [styles.active]: visible })}>
        <button className={styles.head} onClick={() => setVisible(!visible)}>
          <img src="/images/content/avatar.jpg" alt="Avatar" />
          
        </button>
        
        <div className={styles.body}>
          {items.map((item, index) => (
            <div className={styles.menu} key={index}>
              {item.menu.map((x, index) =>
                x.url ? (
                  <NavLink
                    className={cn(styles.item, { [styles.color]: x.color })}
                    activeClassName={styles.active}
                    to={x.url}
                    onClick={() => setVisible(false)}
                    key={index}
                  >
                    {x.icon && <Icon name={x.icon} size="24" />}
                    {x.title}
                  </NavLink>
                ) : (
                  <button
                    className={styles.item}
                    onClick={async () => {
                      await x.onClick()
                      setVisible(false)
                    }}
                    key={index}
                  >
                    {x.title}
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default User;
