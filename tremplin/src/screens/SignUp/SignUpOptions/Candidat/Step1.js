import React, { useState } from "react";
import cn from "classnames";
import styles from "../../SignUp.module.sass";
import { Link } from "react-router-dom";
import { useWizard } from "react-use-wizard";
import Dropdown from "../../../../components/Dropdown";
import TextInput from "../../../../components/TextInput";
export const Step1 = () => {
    const optionsCivilite = ["Monsieur", "Madame", "Autre"];
    const optionsNationalité = ["France", "Belgique", "Espagne", "Portugal"];
    const { handleStep, previousStep, nextStep } = useWizard();
    const [civilite, setCivilite] = useState(optionsCivilite[0]);
    const [Nationalité, setNationalité] = useState(optionsNationalité[0]);
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
                            <div >
                                <span className={styles.pageTitle}>
                                    Informations générales
                                </span>
                            </div>
                            <div className={styles.group}>
                                <div className={styles.field}>
                                    <Dropdown
                                        label="Civilité"
                                        tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                        value={civilite}
                                        setValue={setCivilite}
                                        options={optionsCivilite}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <Dropdown
                                        label="Nationalité"
                                        tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                        value={Nationalité}
                                        setValue={setNationalité}
                                        options={optionsNationalité}
                                    />
                                </div>
                                <TextInput
                                    className={styles.field}
                                    label="Nom"
                                    name="nom"
                                    type="text"
                                    placeholder="Nom"
                                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                    required
                                />
                                <TextInput
                                    className={styles.field}
                                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                    label="Prénom"
                                    name="prenom"
                                    type="text"
                                    placeholder="Prénom"
                                    required
                                />
                                <TextInput
                                    className={styles.field}
                                    label="Téléphone fixe"
                                    name="Téléphone fixe"
                                    type="tel"
                                    placeholder="+33 12345678"
                                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                />

                                <TextInput
                                    className={styles.field}
                                    label="Téléphone"
                                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                    classInput
                                    name="telephone"
                                    type="tel"
                                    placeholder="+33 12345678"
                                    required
                                />

                                <TextInput
                                    className={styles.field}
                                    label="Date naissance"
                                    name="Date"
                                    type="Date"
                                    placeholder=""
                                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                    required
                                />
                                <TextInput
                                    className={styles.field}
                                    label="Email"
                                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                    name="email"
                                    type="text"
                                    placeholder="example@example.com"
                                    required
                                />
                                <TextInput
                                    className={styles.xfield}
                                    label="Adresse postale"
                                    name="Adresse postale: numéro de rue et nom de la rue  "
                                    type="text"
                                    placeholder="7 rue des Fleurs 37000 Tours"
                                    required
                                />
                                <TextInput
                                    className={styles.xfield}
                                    label="Code Postal"
                                    name="Code Postal"
                                    type="text"
                                    placeholder="37000"
                                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                    required
                                />

                                <TextInput
                                    className={styles.xfield}
                                    label="Ville"
                                    name="Ville"
                                    type="text"
                                    placeholder="Ville"
                                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                    required
                                />

                            </div>

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
                        Suivant
                    </button>
                </div>
            </div>




        </>
    );
};