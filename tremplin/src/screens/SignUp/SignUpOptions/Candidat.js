import React, { useState } from "react";
import cn from "classnames";
import styles from "../SignUp.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";

import Image from "../../../components/Image";

import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";
import File from "../../../components/File";

import Checkbox from "../../../components/Checkbox";
import { Step0 } from "./Candidat/Step0"
import { Step1 } from "./Candidat/Step1"
import { Step2 } from "./Candidat/Step2"
import { Step3 } from "./Candidat/Step3"
import { Step4 } from "./Candidat/Step4"
import { Step5 } from "./Candidat/Step5"
import { Wizard, useWizard } from "react-use-wizard";
const optionsAge = ["Majeur", "Mineur"];

const checkboxValues = [
  "Recherche de stage",
  "Recherche d'alternance",
  "Recherche d'un 1er emploi",
  "Demande de conseil en orientation",
  "Atelier TREMPLIN Handicap",
  "Demandes d'informations sur les dispositifs existants liés au handicap dans le cadres des études ou de l'emploi",
];
const items = [
  "Unlimited product uploads",
  "Pro tips",
  "Free forever",
  "Full author options",
];







const optionsChargeAccompagnement = [
  "Albane Du PELOUX",
  "Hélène LETZELTER",
  "Smhulla SAINT-FELIX",
];


const SignUp = ({ className }) => {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/images/logo-dark.png"
            srcDark="/images/logo-light.png"
            alt="Core"
          />
        </Link>
        <div className={styles.wrap}>
          <div className={styles.preview}>
            <img src="/images/content/login-pic.png" alt="Login" />
          </div>
          <div>
            <div className={cn("h4", styles.subtitle)}>Plan includes</div>

            <ul className={styles.list}>
              {items.map((x, index) => (
                <li key={index}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Wizard>
        <Step0 />
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
        <Step5 />
        <Step6 />
      </Wizard>
    </div>
  );
};






const Step6 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [selectedItems, setSelectedItems] = useState([]);
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

  const optionsniveauetude = ["Bac+1", "Bac+2"];
  const [niveauetude, setniveauetude] = useState(optionsniveauetude[0]);
  const optionsdiplome = [
    "Brevet des Collèges",
    "CAP/ BEP (Niv.3/ Anciennement V)",
  ];
  const [diplome, setdiplome] = useState(optionsdiplome[0]);
  const optionsdomainetude = ["informatique", "Banque ", "batiment "];
  const [domainetude, setdomainetude] = useState(optionsdomainetude[0]);
  const heightWindow = use100vh();
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
                    Engagements
                  </span>
                </div>
                <div className={styles.group}>

                  <div className={styles.field}>


                    <div className={styles.field}>


                      <div style={{ display: "flex", alignItems: "start" }}>
                        <input
                          style={{ marginTop: "5px" }}
                          type="checkbox"
                          className={styles.checkbox}
                          value={checkboxValues[2]}
                          onChange={checkboxHandler}
                          checked={selectedItems.includes(checkboxValues[2])}
                        />
                        <label>
                          Je certifie les renseignements ci-dessus rigoureusement
                          exacts et déclare avoir pris connaissance du fait que les
                          informations renseignées dans ce formulaire figureront
                          dans un fichier informatique confidentiel
                        </label>
                      </div>
                    </div>
                    <div className={styles.field}>

                      <div style={{ display: "flex", alignItems: "start" }}>
                        <input
                          style={{ marginTop: "5px" }}
                          type="checkbox"
                          className={styles.checkbox}
                          value={checkboxValues[3]}
                          onChange={checkboxHandler}
                          checked={selectedItems.includes(checkboxValues[3])}
                        />
                        <label>
                          J'accepte que:
                          <div className={styles.termesEtconditions}>
                            <div>
                              -les informations saisies dans le formulaire figurent
                              dans un fichier informatique
                            </div>
                            <div>
                              -seules les informations saisies et précédées du signe
                              "@" soient transmises à l'ensemble du réseau des
                              employeurs partenaires de TREMPLIN Handicap
                            </div>
                            <div>
                              -Mon CV soit diffusé auprès du réseau des employeurs
                              partenaires de TREMPLIN Handicap dans le cadre de mon
                              accompagnement et des différents évènements que
                              l'association organise
                            </div>
                            <div>
                              -TREMPLIN Handicap utilise mes coordonnées (mails,
                              téléphoniques, sms) pour me contacter et me
                              transmettre des informations utiles à mon
                              accompagnement
                            </div>
                          </div>
                        </label>

                      </div>
                    </div>
                    <div className={styles.field}>


                      <div style={{ display: "flex", alignItems: "start" }}>
                        <input
                          style={{ marginTop: "5px" }}
                          type="checkbox"
                          className={styles.checkbox}
                          value={checkboxValues[4]}
                          onChange={checkboxHandler}
                          checked={selectedItems.includes(checkboxValues[4])}
                        />
                        <label>
                          Je note qu'en conformité avcheckboxValuesec la loi du 6
                          février 1978, il me sera possible d'avoir accès aux
                          informations me concernant, de les faire rectifier ou
                          détruire si j'en exprime le besoin.
                        </label>
                      </div>
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
                </div>
              </div>
            </div>


          </>
        </div>
      </div>

    </>
  );
};

export default SignUp;
