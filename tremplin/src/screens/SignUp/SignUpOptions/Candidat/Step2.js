import React, { useState } from "react";
import cn from "classnames";
import styles from "../../SignUp.module.sass";
import { Link } from "react-router-dom";
import { useWizard } from "react-use-wizard";
import Dropdown from "../../../../components/Dropdown";
import TextInput from "../../../../components/TextInput";
export const Step2 = () => {
    const { previousStep, nextStep } = useWizard();
    const optionsniveauetude = [
        "6ème",
        "Terminale (Bac)",
        "Bac +1",
        "Bac +2",
        "Bac +3",
        "Bac +4",
        "Bac +5",
        "Bac +8",
    ];
    const [niveauetude, setniveauetude] = useState(optionsniveauetude[0]);
    const optionsdiplome = [
        "Brevet des Collèges",
        "CAP/ BEP (Niv.3/ Anciennement V)",
        "Baccalauréat (Niv.4/ Anciennement IV)",
        "DEUG/BTS/DUT/DEUST (Niv.5/ Anciennement III)",
        "Licence, Licence professionnelle (Niv.6 / Anciennement II)",
        "Maitrise, Master 1 (Niv.6 / Anciennement II)",
        "Master, DEA, DES, Diplôme d'Ingénieur (Niv.7 / Anciennement I)",
        "Doctorat (Niv.8 / Anciennement I)"
    ];
    const [diplome, setdiplome] = useState(optionsdiplome[0]);
    const optionsdomainetude = [
        "Achats",
        "Agriculture, Agroalimentaire",
        "Arts appliqués, plastiques, graphiques",
        "Audiovisuel",
        "Banque, Assurance",
        "Bâtiment, Travaux publics",
        "Commerce",
        "Comptabilité, Gestion",
        "Décoration, Architecture",
        "Documentation, Bibliothèque",
        "Droit",
        "Economie, Finance",
        "Enseignement",
        "Environnement",
        "Esthétique, Beauté",
        "Fonction Publique",
        "Hôtellerie, Restauration",
        "Immobilier",
        "Information, Communication",
        "Informatique",
        "Informatique - Développement",
        "Informatique - Gestion de projet",
        "Informatique - Réseaux",
        "Informatique - Sécurité",
        "Informatique - Intelligence Artificielle",
        "Informatique - Base de données",
        "Informatique - Systèmes embarqués",
        "Internet",
        "Lettres & Langues",
        "Marketing",
        "Multimédia",
        "Patrimoine, Culture",
        "Ressources Humaines",
        "Santé",
        "Sciences",
        "Sciences Humaines",
        "Sciences Industrielles",
        "Sciences politiques",
        "Sciences Sociales",
        "Secrétariat, Assistant",
        "Sport",
        "Tourisme, Loisirs",
        "Transport, Logistique"
    ];
    const [domainetude, setdomainetude] = useState(optionsdomainetude[0]);
    const currentDiplomeOptions = [
        "Brevet",
        "CAP/BEP",
        "Bac",
        "BTS",
        "Bachelor",
        "BUT : Bachelor Universitaire de Technologie",
        "Licence",
        "Licence Pro",
        "Master 1",
        "Master 2",
        "Doctorat",
        "Diplôme d'ingénieur",
        "Master Spécialisé",
        "Diplôme d'École de Commerce",
    ];
    const [currentDiplome, setcurrentDiplome] = useState(currentDiplomeOptions[0]);
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
                            <div >
                                <span className={styles.pageTitle}>
                                    Votre parcours scolaire
                                </span>
                            </div>
                            <div className={styles.group}>
                                <div className={styles.field}>
                                    <Dropdown
                                        label="Quel est votre niveau d'études en cours ?"
                                        tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                        value={niveauetude}
                                        setValue={setniveauetude}
                                        options={optionsniveauetude}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <Dropdown
                                        label="Quel est votre domaine d'étude en cours ?"
                                        tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                        value={domainetude}
                                        setValue={setdomainetude}
                                        options={optionsdomainetude}
                                        grise={["6ème", "Terminale (Bac)"].includes(niveauetude) ? true : null}

                                    />
                                </div>
                                <div className={styles.field}>
                                    <Dropdown
                                        label="Quel diplôme préparez-vous actuellement ?"
                                        tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                        value={currentDiplome}
                                        setValue={setcurrentDiplome}
                                        options={currentDiplomeOptions}
                                    />
                                </div>
                                <TextInput
                                    className={styles.field}
                                    label=" le lien internet renvoyant vers votre formation actuelle "
                                    name=" le lien internet renvoyant vers votre formation actuelle "
                                    type="text"
                                    placeholder="https//lien.fr"

                                />

                                <TextInput
                                    className={styles.field}
                                    label="Quelques précisions sur votre situation scolaire actuelle"
                                    name="Quelques précisions sur votre situation scolaire actuelle"
                                    type="text"
                                    placeholder="Entrez votre réponse"
                                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                />
                                <TextInput
                                    className={styles.field}
                                    label="De quelles adaptations avez-vous bénéficié dans votre parcours scolaire"
                                    name="De quelles adaptations avez-vous bénéficié dans votre parcours scolaire"
                                    type="text"
                                    placeholder="Entrez votre réponse"
                                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                />
                                <div className={styles.xfield}>
                                    <Dropdown
                                        label="Quel est le niveau du dernier diplôme obtenu "
                                        tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                        value={diplome}
                                        setValue={setdiplome}
                                        options={optionsdiplome}
                                        upBody
                                    />
                                </div>
                                <TextInput
                                    className={styles.xfield}
                                    label="En quelle année avez-vous obtenu votre dernier diplôme"
                                    type="Date"
                                    placeholder=" description"
                                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                />
                                <div className={styles.xfield}>
                                    <Dropdown
                                        label="Dans quel domaine avez-vous obtenu votre dernier diplôme ?"
                                        tooltip="Maximum 100 characters. No  HTML or emoji allowed"
                                        value={domainetude}
                                        setValue={setdomainetude}
                                        options={optionsdomainetude}
                                        upBody
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
                    </>
                </div>
            </div>


        </>
    );
};