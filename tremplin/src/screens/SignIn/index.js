import React, { useState } from "react";
import cn from "classnames";
import styles from "./SignIn.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";
import TextInput from "../../components/TextInput";
import Image from "../../components/Image";
import { useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";

const SignIn = () => {
  const heightWindow = use100vh();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      });
      if (error) throw error;
      data.user && navigate("/");
    } catch (error) {
      console.log(username + " " + password);
      console.error("Error logging in:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.frame}>
      <div className={styles.partition}>
        <div className={styles.login} >
          <div className={styles.wrapper}>
            <Link className={styles.logo} to="/">
              <Image
                className={styles.pic}
                src="/images/logo-dark.png"
                srcDark="/images/logo-light.png"
                alt="Core"
              />
            </Link>
            <div className={cn("h4", styles.title)}>Se connecter </div>

            <div className={styles.body}>
              <TextInput
                className={styles.field} 
                name="username"
                type="username"
                placeholder="Nom d'utilisateur"
                required
                icon="profile-circle"
                value={username}
                onChange={setUsername}
              />
              <TextInput
                className={styles.field}
                name="password"
                type="password"
                placeholder="Mot de passe"
                required
                icon="lock"
                value={password}
                onChange={setPassword}
              />
              <button
                className={cn("button", styles.button)}
                disabled={isLoading}
                onClick={handleSignIn}
              >
                Se connecter
              </button>
            </div>
          </div>
        </div>
        <div className={styles.separation}> </div>

        <div className={styles.signup}>
          <div className={cn("h4", styles.title)}>Inscrivez-vous</div>
          <div className={styles.shop}></div>

          <div className={styles.signupoptions}>
            <Link className={cn("button-stroke", styles.button)} to="/Candidat">
              <span> Candidat </span>
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
              to="/collaborateur"
            >
              <span> Collaborateur </span>
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
              to="/entreprise"
            >
              <span> Entreprise </span>
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
            {/* <Link
              className={cn("button-stroke", styles.button)}
              to="/entreprise"
            >
              <span> Centre de Formation </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M9 17l6-6-6-6" />
              </svg>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
