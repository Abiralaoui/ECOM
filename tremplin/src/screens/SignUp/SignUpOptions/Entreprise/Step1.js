import React, { useState } from "react";
import cn from "classnames";
import styles from "../../SignUp.module.sass";
import { Link } from "react-router-dom";
import { useWizard } from "react-use-wizard";
import Editor from "../../../../components/Editor";
import TextInput from "../../../../components/TextInput";
export const Step1 = () => {
  const [content, setContent] = useState();
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <>
      <div className={styles.col}>
        <div className={styles.head}>
          <div className={styles.info}>
            Déjà inscrit?{" "}
            <Link className={styles.link} to="/sign-in">
              Se connecter
            </Link>
          </div>
        </div>
        <div>
          <>
            <div className={styles.group}>
              <TextInput
                className={styles.field}
                label="Nom"
                name="value1"
                type="text"
                placeholder="Nom de l'entreprise"
                tooltip="Maximum 100 characters. No HTML or emoji allowed"
                required
              />
              <TextInput
                className={styles.field}
                label="Raison Sociale"
                name="value2"
                type="text"
                placeholder="Dénomination Sociale"
                tooltip="Maximum 100 characters. No HTML or emoji allowed"
                required
              />
              <TextInput
                className={styles.field}
                label="SIRET"
                name="value3"
                type="text"
                placeholder="Exemple: 552 178 639 00132"
                tooltip="Maximum 100 characters. No HTML or emoji allowed"
                required
              />
              <TextInput
                className={styles.field}
                label="Code APE"
                name="value4"
                type="text"
                placeholder="Exemple: 4765B"
                tooltip="Maximum 100 characters. No HTML or emoji allowed"
                required
              />
              <TextInput
                className={styles.field}
                label="Site Web"
                name="value5"
                type="text"
                placeholder="Exemple: www.monentreprise.com"
              />
              <TextInput
                className={styles.field}
                label="Page de recrutement"
                name="title"
                type="text"
                placeholder="Exemple: www.monentreprise.com/recrutement"
              />

              <TextInput
                className={styles.field}
                label="Effectif"
                name="value7"
                type="number"
                required
              />
              <TextInput
                className={styles.field}
                label="Adresse"
                name="title"
                type="text"
                placeholder="Adresse de l'entreprise"
                tooltip="Maximum 100 characters. No HTML or emoji allowed"
                required
              />
            </div>
            <div className={styles.entrepriseEditor}>
              <Editor
                state={content}
                onChange={setContent}
                classEditor={styles.editor}
                label="Politique Handicap"
                tooltip="Politique Handicap"
              />
            </div>
          </>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.previousButton}>
          <button
            className={cn("button", styles.button)}
            onClick={() => previousStep()}
          >
            Précédent
          </button>
        </div>
        <div className={styles.nextButton}>
          <button
            className={cn("button", styles.button)}
            onClick={() => nextStep()}
          >
            Valider
          </button>
        </div>
      </div>
    </>
  );
};
