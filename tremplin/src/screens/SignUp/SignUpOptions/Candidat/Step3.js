import React, { useState } from "react";
import cn from "classnames";
import styles from "../../SignUp.module.sass";
import { Link } from "react-router-dom";
import { useWizard } from "react-use-wizard";
const langueOptions = [
    "Arabe",
    "Espagnol",
    "Japonais",
    "Russe",
    "Aucune",
    "Autre",
];
export const Step3 = () => {
    const { previousStep, nextStep } = useWizard();
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedLevel, setselectedLevel] = useState("");
    const [visible, setVisible] = useState(false);
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
    function radioboxHandler(e) {
        let isSelected = e.target.checked;
        if (isSelected) {
            setselectedLevel(e.target.value);
            setVisible(!visible);
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
                <>
                    <div className={styles.group}>
                        <span className={styles.pageTitle}>
                            Auto-Evalution des niveaux de langues pratiquées{" "}
                        </span>
                    </div>
                    <div
                        className={styles.group}
                        style={{
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            flexGrow: "1"
                        }}
                    >
                        <div className={styles.field}>
                            <div style={{ marginBottom: "1vh" }}>
                                Parlez-vous d'autres langues ?
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    value={langueOptions[0]}
                                    onChange={checkboxHandler}
                                    checked={selectedItems.includes(langueOptions[0])}
                                />
                                <label>Arabe</label>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    value={langueOptions[1]}
                                    onChange={checkboxHandler}
                                    checked={selectedItems.includes(langueOptions[1])}
                                />
                                <label>Espagnol</label>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    value={langueOptions[2]}
                                    onChange={checkboxHandler}
                                    checked={selectedItems.includes(langueOptions[2])}
                                />
                                <label>Japonais</label>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    value={langueOptions[3]}
                                    onChange={checkboxHandler}
                                    checked={selectedItems.includes(langueOptions[3])}
                                />
                                <label>Russe</label>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    value={langueOptions[4]}
                                    onChange={checkboxHandler}
                                    checked={selectedItems.includes(langueOptions[4])}
                                />
                                <label>Aucune</label>
                            </div>

                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    className={styles.input}
                                    value={langueOptions[5]}
                                    onChange={checkboxHandler}
                                    checked={selectedItems.includes(langueOptions[5])}
                                />
                                <input
                                    type="text"
                                    className={styles.langueInput}
                                    placeholder="Autre "
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <div style={{ marginBottom: "1vh" }}>
                                Quelle est votre niveau de langue en anglais (écrit/oral) ?
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="radio"
                                    className={styles.checkbox}
                                    value="Elémentaire"
                                    onChange={radioboxHandler}
                                    checked={!selectedLevel.localeCompare("Elémentaire")}
                                />
                                <label>Elémentaire</label>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="radio"
                                    className={styles.checkbox}
                                    value="Intermédiaire"
                                    onChange={radioboxHandler}
                                    checked={!selectedLevel.localeCompare("Intermédiaire")}
                                />
                                <label>Intermédiaire</label>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="radio"
                                    className={styles.checkbox}
                                    value="Expérimenté"
                                    onChange={radioboxHandler}
                                    checked={!selectedLevel.localeCompare("Expérimenté")}
                                />
                                <label>Expérimenté</label>
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
                                    Suivant
                                </button>
                            </div>
                        </div>
                    </div>

                </>


            </div>



        </>
    );
};