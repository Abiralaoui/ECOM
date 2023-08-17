import React, { useState } from "react";
import cn from "classnames";
import styles from "../../SignUp.module.sass";
import { Link } from "react-router-dom";
import { useWizard } from "react-use-wizard";
export const Step0 = () => {
    const { handleStep, previousStep, nextStep } = useWizard();
    const [selectedItems, setSelectedItems] = useState([]);
    const [visible, setVisible] = useState(false);
    const checkboxValues = [
        "Être au minimum au collège",
        "Être âgé de moins de 35 ans",
        "Avoir des troubles de santé durables avérés - avec ou sans reconnaissance administrative du handicap (PPS/RQTH/AEEH/AAH/Etc.)",
        "Maximum 2 ans d'expérience professionnelle après vos études.",
        "Ne pas avoir interrompu ses études depuis plus de 2 ans"
    ]

    function checkboxHandler(e) {
        let isSelected = e.target.checked;

        if (isSelected) {
            setSelectedItems([...selectedItems, e.target.value]);
            setVisible(!visible);
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== e.target.value));
            // setVisible(!visible);
        }
    }
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
                        <div className={styles.haut}>
                            <div className={styles.group}>
                                <div >
                                    <span className={styles.pageTitle}>
                                        Conditions générales
                                    </span>
                                </div>
                                <div className={styles.group}>

                                    <div className={styles.field}>
                                        {
                                            checkboxValues.map((field, index) => (
                                                <div className={styles.field}>


                                                    <div style={{ display: "flex", alignItems: "start" }}>
                                                        <input
                                                            type="checkbox"
                                                            className={styles.checkbox}
                                                            value={checkboxValues[index]}
                                                            onChange={checkboxHandler}
                                                            checked={selectedItems.includes(checkboxValues[index])}
                                                        />
                                                        <label>
                                                            {field}
                                                        </label>
                                                    </div>
                                                </div>
                                            ))
                                        }


                                    </div>
                                    <div className={styles.buttonWrapper}>
                                        <div className={styles.nextButton}>
                                            <button
                                                className={cn("button", styles.button)}
                                                onClick={() => nextStep()}
                                            >
                                                Suivant
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </>
                </div>
            </div>

        </>
    );
};