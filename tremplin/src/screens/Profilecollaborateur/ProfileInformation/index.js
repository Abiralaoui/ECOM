import React, { useState } from "react";
import cn from "classnames";
import styles from "./ProfileInformation.module.sass";
import Item from "../Item";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";

const ProfileInformation = ({ className }) => {
  const [content, setContent] = useState();

  return (
    <Item
      className={cn(styles.card, className)}
      title="Informations Générales"
      classTitle="title-blue"
    >
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <img src="/images/content/avatar.jpg" alt="Avatar" />
          <button className={styles.remove}>
            <Icon name="close" />
          </button>
        </div>
        <div className={styles.file}>
          <input type="file" />
          <button className={cn("button", styles.button)} type="button">
            <Icon name="add" size="24" />
            <span>Uploader une nouvelle image</span>
          </button>
        </div>
        <button className={cn("button-stroke", styles.button)}>Supprimer</button>
      </div>
      <div className={styles.fieldset}>
        <TextInput
          className={styles.field}
          label=" Nom"
          name="display-name"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        <TextInput
          className={styles.field}
          label=" Prenom"
          name="display-name"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        <TextInput
          className={styles.field}
          label="  Numero Telephone"
          name="Telephone"
          type="Telephone"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        
        <TextInput
          className={styles.field}
          label="email"
          name="email"
          type="email"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        <TextInput
          className={styles.field}
          label="  Date naissnace"
          name="Date naissnace"
          type="date"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        
        
      </div>
    </Item>
  );
};

export default ProfileInformation;
