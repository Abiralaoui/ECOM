import React from "react";
import cn from "classnames";
import styles from "./SignUp.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";

import Image from "../../components/Image";

// import { useNavigate } from "react-router-dom";

const items = [
  "Unlimited product uploads",
  "Pro tips",
  "Free forever",
  "Full author options",
];

const SignUp = ({ className }) => {
  // const navigate = useNavigate();

  // const handleButtonClick = () => {
  //   // Utilisez la fonction navigate pour naviguer vers une nouvelle route
  //   navigate("/Signin");
  // };

  const heightWindow = use100vh();

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.wrap}>
          <div className={styles.preview}>
            <img src="/images/content/login-pic.png" alt="Login" />
          </div>
          <div className={cn("h4", styles.subtitle)}>Plan includes</div>
          <ul className={styles.list}>
            {items.map((x, index) => (
              <li key={index}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.col} style={{ minHeight: heightWindow }}>
        <div className={styles.head}>
          <Link className={styles.logo} to="/">
            <Image
              className={styles.pic}
              src="/images/logo-dark.png"
              srcDark="/images/logo-light.png"
              alt="Core"
            />
          </Link>
          <div className={styles.info}>
            Already a member?{" "}
            <Link className={styles.link} to="/sign-in">
              Sign in
            </Link>
          </div>
        </div>
        <div className={styles.options}>
          <div className={cn("h2", styles.title)}>Sign up</div>
          <div className={styles.shop}></div>

          <div className={styles.signupoptions}>
            <Link className={cn("button-stroke", styles.button)} to="/Candidat">
              <span> je suis candidat </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M9 17l6-6-6-6" />
              </svg>
            </Link>

            <Link
              className={cn("button-stroke", styles.button)}
              to="/Collaborateur"
            >
              <span> je suis Collaborateur </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M9 17l6-6-6-6" />
              </svg>
            </Link>

            <Link
              className={cn("button-stroke", styles.button)}
              to="/Entreprise"
            >
              <span> je suis Entreprise </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M9 17l6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
