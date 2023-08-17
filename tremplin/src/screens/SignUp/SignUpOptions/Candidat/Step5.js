import React, { useState } from "react";
import cn from "classnames";
import styles from "../../SignUp.module.sass";
import { Link } from "react-router-dom";
import { useWizard } from "react-use-wizard";
import File from "../../../../components/File";

export const Step5 = () => {
    const { previousStep, nextStep } = useWizard();
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
                        <div className={styles.haut}>
                            <div className={styles.group}>
                                <div >
                                    <span className={styles.pageTitle}>
                                        Documents
                                    </span>
                                </div>
                                <div className={styles.group}>
                                    <File
                                        className={styles.fullfield}
                                        title="Cliquez ou déposez le fichier"
                                        label="CV"
                                        tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                    />
                                    <File
                                        className={styles.fullfield}
                                        title="Cliquez ou déposez le fichier"
                                        label="PPS/RQTH/AEEH/AAH/Etc."
                                        tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                    />
                                    {/* <File
                                        className={styles.fullfield}
                                        title="Cliquez ou déposez le fichier"
                                        label="AAH"
                                        tooltip="Maximum 100 characters. No HTML or emoji allowed"
                                    /> */}
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