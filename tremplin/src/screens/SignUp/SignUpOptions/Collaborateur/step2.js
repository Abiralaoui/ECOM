import React, { useState } from "react";
import cn from "classnames";
import styles from "../../SignUp.module.sass";
import { Link } from "react-router-dom";
import { useWizard } from "react-use-wizard";
import Editor from "../../../../components/Editor";
import File from "../../../../components/File";
export const Step2 = () => {
  const { previousStep, nextStep } = useWizard();
  const [motivation, setMotivation] = useState();

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
          <div className={styles.nav}></div>

          <>
            <div className={styles.group}>
              <div>
                <span className={styles.pageTitle}>Documents</span>
              </div>

              <div className={styles.field && styles.fullfield}>
                <File
                  title="Domaine d'action/Historique/Métier"
                  label="Domaine d'action/Historique/Métier"
                  tooltip="Maximum 100 characters. No HTML or emoji allowed"
                />
                <File
                  title="Click or drop your cv"
                  label="CV"
                  tooltip="Maximum 100 characters. No HTML or emoji allowed"
                />
              </div>
              <div className={styles.field && styles.fullfield}>
                <Editor
                  state={motivation}
                  onChange={setMotivation}
                  classEditor={styles.editor}
                  label="Motivation"
                  tooltip="Motivation"
                />
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
            </div>
          </>
        </div>
      </div>
    </>
  );
};