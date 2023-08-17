import React, { useState } from "react";
import cn from "classnames";
import styles from "../SignUp.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";
import Image from "../../../components/Image";
import { Wizard, useWizard } from "react-use-wizard";
import { Step0 } from "./Collaborateur/step0"
import { Step1 } from "./Collaborateur/step1"
import { Step2 } from "./Collaborateur/step2"

const items = [
  "Unlimited product uploads",
  "Pro tips",
  "Free forever",
  "Full author options",
];

const optionsCivilite = ["M.", "Mme.", "Mlle."];

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
       
      </Wizard>
    </div>
  );
};

export default SignUp;
