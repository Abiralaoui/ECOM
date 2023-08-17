import React, { useState } from "react";
import cn from "classnames";
import styles from "../../SignUp.module.sass";
import { Link } from "react-router-dom";
import { useWizard } from "react-use-wizard";
import Dropdown from "../../../../components/Dropdown";

const optionspartenaire = ["partenaire1", "partenaire2", "partenaire3", "partenaire4"];

export const Step0 = () => {
    const { handleStep, previousStep, nextStep } = useWizard();
    const [selectedItems, setSelectedItems] = useState([]);
    const [partenaire, setPartenaire] = useState(optionspartenaire[0]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state for form submission

    const checkboxValues = ["vous faites partie d'une entreprise partenaire ."];

    function checkboxHandler(e) {
        let isSelected = e.target.checked;

        if (isSelected) {
            setSelectedItems([...selectedItems, e.target.value]);
            setIsDropdownVisible(true);
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== e.target.value));
            setIsDropdownVisible(false);
        }

        setIsCheckboxChecked(isSelected);
    }

    function handleNextStep() {
        if (isCheckboxChecked) {
            nextStep();
        } else {
            setIsFormSubmitted(true); // Set the form submission flag
            setIsCheckboxChecked(false); // Reset the checkbox state
        }
    }

    return (
        <div className={styles.col }>
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
                <div className={styles.haut}>
                    <div className={styles.group}>
                        <div>
                            <span className={styles.pageTitle}>
                                Conditions générales
                            </span>
                        </div>
                        <div className={styles.group}>
                            <div className={styles.field}>
                                {checkboxValues.map((field, index) => (
                                    <div className={styles.field} key={index}>
                                        <div
                                            style={{
                                                marginTop:"3px",
                                                marginRight: "800px",
                                                display: "center",
                                                alignItems: "start",
                                                margintop: "264px",
                                                marginleft: "83px",

                                                gap: 2,
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                className={styles.checkbox}
                                                value={checkboxValues[index]}
                                                onChange={checkboxHandler}
                                                checked={selectedItems.includes(checkboxValues[index])}
                                            />
                                            <label>{field}</label>
                                        </div>
                                        {!isCheckboxChecked && isFormSubmitted && (
                                            <div className={styles.errorMessage}>
                                                Veuillez cocher cette case pour continuer.
                                            </div>
                                        )}
                                        {isDropdownVisible && (
                                            <div
                                                className={styles.field}
                                                style={{
                                                    marginRight: "400px",
                                                    height: "100px",
                                                    width: "500px",
                                                    marginTop: "20px",
                                                }}
                                            >
                                                <Dropdown
                                                    label="Partenaire"
                                                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                                    value={partenaire}
                                                    setValue={setPartenaire}
                                                    options={optionspartenaire}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.buttonWrapper}>
                                <div className={styles.nextButton}>
                                    <button
                                        className={cn("button", styles.button)}
                                        onClick={handleNextStep}
                                    >
                                        Suivant
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
