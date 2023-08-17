import React, { useState } from "react";
import cn from "classnames";
import styles from "../../SignUp.module.sass";
import { Link } from "react-router-dom";
import { useWizard } from "react-use-wizard";
import Dropdown from "../../../../components/Dropdown";
import TextInput from "../../../../components/TextInput";
const optionsHandicap = [
    "Handicap moteur",
    "Handicap physique (maladie)",
    "Handicap visuel",
    "Handicap auditif",
    "Handicap psychique",
    "Handicap cognitif",
    "Trouble des apprentissages",
    "Autre"
];
const optionsProfession = [
    "Agriculteurs",
    "Artisans",
    "Commerçants",
    "Chefs d'entreprise",
    "Pas de parent",
];
const optionsOrientationProfessionnelle = [
    "En milieu ordinaire",
    "En Milieu Protégé de Travail (MPT) ",
    "Ni l'un ni l'autre",
];
const optionsReseau = [
    "LinkedIn",
    "Facebook",
    "Instagram",
    "Twitter",
    "Site Internet TREMPLIN Handicap",
    "Article magazine/journal",
    "Mon école-Mission handicap",
    "Mon école-Assistante sociale",
    "Mon école-Professeur",
    "Mon école-Médecine scolaire/universitaire",
    "Mon école-Autre étudiant",
    "Mon école-Autre",
    "Le bureau des stages et de l'emploi",
    "Proviseur",
    "Principal",
    "Mes parents",
    "Mon frère/ma sœur",
    "Mes amis",
    "Autre étudiant dans une autre école",
    "CIO",
    "Psychologue de l’éducation nationale",
    "Entreprise",
    "AGEFIPH",
    "APEC",
    "CAP Emploi",
    "Mission Locale",
    "MDPH",
    "Mairie",
    "Collectif Mentorat",
    "Autre"
];
const optionsPermis = ["Oui", "Non", "En cours"];
const optionsRQTH = ["Oui", "Non", "Dossier en cours"];
export const Step4 = () => {
    const { previousStep, nextStep } = useWizard();
    const [reseau, setReseau] = useState(optionsReseau[0]);
    const [orientationProfessionnelle, setOrientationProfessionnelle] = useState(
        optionsOrientationProfessionnelle[0]
    );
    const [professionparent1, setprofessionparent1] = useState(
        optionsProfession[0]
    );
    const [professionparent2, setprofessionparent2] = useState(
        optionsProfession[0]
    );
    const [permis, setPermis] = useState(optionsPermis[0]);
    const [RQTH, setRQTH] = useState(optionsRQTH[0]);
    const [handicap, setHandicap] = useState(optionsHandicap[0]);
    return (
        <>

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
                    <>
                        <div className={styles.haut}>
                            <div className={styles.group}>
                                <div >
                                    <span className={styles.pageTitle}>
                                        Renseignements complémentaires
                                    </span>
                                </div>
                                <div className={styles.group}>
                                    <div className={styles.xfield}>
                                        <Dropdown
                                            label="Catégorie professionnelle parent 1"
                                            tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                            value={professionparent1}
                                            setValue={setprofessionparent1}
                                            options={optionsProfession}
                                        />
                                    </div>
                                    <div className={styles.xfield}>
                                        <Dropdown
                                            label="Catégorie professionnelle parent 2"
                                            tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                            value={professionparent2}
                                            setValue={setprofessionparent2}
                                            options={optionsProfession}
                                        />
                                    </div>
                                    <TextInput
                                        className={styles.xfield}
                                        label="Numero de téléphone de votre parent 1/2"
                                        name="Numero de téléphone de votre parent 1/2"
                                        type="text"
                                        placeholder="+33 01 23 45 67 89"
                                    />

                                    <div className={styles.field}>
                                        <Dropdown
                                            label="Comment avez-vous connu TREMPLIN Handicap ?"
                                            tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                            value={reseau}
                                            setValue={setReseau}
                                            options={optionsReseau}
                                        />
                                    </div>
                                    <TextInput
                                        className={styles.field}
                                        label="Autre détails"
                                        name="Autre détails"
                                        type="text"
                                        placeholder="Entrez votre réponse"
                                    />
                                    <div className={styles.field}>
                                        <Dropdown
                                            label="Votre situation de handicap "
                                            tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                            value={handicap}
                                            setValue={setHandicap}
                                            options={optionsHandicap}
                                        />
                                    </div>
                                    <TextInput
                                        className={styles.field}
                                        label="Avez-vous besoin d'aménagements spécifiques ?"
                                        name="Avez-vous besoin d'aménagements spécifiques ?"
                                        type="text"
                                        placeholder="Entrez votre réponse"
                                    />
                                    <div className={styles.xfield}>
                                        <Dropdown
                                            label="Avez-vous le permis de conduire ?"
                                            tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                            value={permis}
                                            setValue={setPermis}
                                            options={optionsPermis}

                                        />
                                    </div>

                                    <div className={styles.xfield}>
                                        <Dropdown
                                            label="Avez-vous une RQTH? "
                                            tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                            value={RQTH}
                                            setValue={setRQTH}
                                            options={optionsRQTH}

                                        />
                                    </div>

                                    <div className={styles.xfield}>
                                        <Dropdown
                                            label="Avez-vous une MDPH en  ? "
                                            tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                            value={orientationProfessionnelle}
                                            setValue={setOrientationProfessionnelle}
                                            options={optionsOrientationProfessionnelle}

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