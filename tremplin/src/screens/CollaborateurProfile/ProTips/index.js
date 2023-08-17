import React, { useState } from "react";
import cn from "classnames";
import styles from "./ProTips.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import ModalPreview from "../../../components/ModalPreview";

const tips = [
  {
    title: "entretien 1",
    icon: "schedule",
    statusColor: "purple",
    statusText: "New",
    avatar: "/images/content/avatar-4.jpg",
    action: "3 mins ",
  },

  {
    title: "entretien 2",
    icon: "schedule",
    statusColor: "purple",
    statusText: "New",
    avatar: "/images/content/avatar-3.jpg",
    action: "1 mins ",
  },
 
  {
    title: "entretien 3",
    icon: "schedule",
    statusColor: "purple",
    statusText: "New",
    avatar: "/images/content/avatar.jpg",
    action: "1 mins ",
  },
  {
    title: "entretien 4",
    icon: "multiselect",
    avatar: "/images/content/avatar-4.jpg",
    statusColor: "green",
    statusText: "Done",
  },
 
  
];

const ProTips = ({ className }) => {
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Prochaine entretiens"
        classTitle="title-green"
      >
        <div className={styles.tips}>
          <div className={styles.info}>
           Consulter le calendrier Pour afficher tout les Evenements 
          </div>
          <div className={styles.list}>
            {tips.map((x, index) => (
              <div
                className={styles.item}
                key={index}
                onClick={() => setVisibleModalPreview(true)}
              >
                <div className={styles.icon}>
                  <Icon name={x.icon} size="24" />
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>{x.title}</div>
                  <div className={styles.line}>
                    {x.statusText && (
                      <div
                        className={cn(
                          { "status-purple": x.statusColor === "purple" },
                          { "status-green-dark": x.statusColor === "green" },
                          { "status-red-dark": x.statusColor === "red" },
                          styles.status
                        )}
                      >
                        {x.statusText}
                      </div>
                    )}
                    <div className={styles.user}>
                      <div className={styles.avatar}>
                        <img src={x.avatar} alt="Avatar" />
                      </div>
                      <div className={styles.action}>{x.action}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <ModalPreview
        visible={visibleModalPreview}
        onClose={() => setVisibleModalPreview(false)}
        video="/images/content/video.mp4"
        title="Use guidelines"
      />
    </>
  );
};

export default ProTips;
