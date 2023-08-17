import React from "react";
import cn from "classnames";
import styles from "./Login.module.sass";
import Item from "../Item";
import TextInput from "../../../components/TextInput";

const Login = ({ className }) => {
  return (
    <Item
      className={cn(styles.card, className)}
      title="Login"
      classTitle="title-blue"
    >
      <div className={styles.fieldset}>
        <TextInput
          className={styles.field}
          label="Ancien mot de passe"
          name="Ancien mot de passe"
          type="password"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        <div className={styles.row}>
          <TextInput
            className={styles.field}
            label="Nouveau mot de passe"
            name="Nouveau mot de passe"
            type="password"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"
            required
          />
          <TextInput
            className={styles.field}
            label="Confirmer le Nouveau mot de passe"
            name="Confirmer le Nouveau mot de passe"
            type="password"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"
            required
          />
        </div>
        <button className={cn("button-stroke", styles.button)}>
          Modifier mot de passe 
        </button>
      </div>
    </Item>
  );
};

export default Login;
