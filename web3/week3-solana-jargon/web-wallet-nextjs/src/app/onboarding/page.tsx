"use client"
import styles from "./page.module.css";
import React from "react";
import SelectBlockchain from "@components/SelectNetwork/SelectNetwork";
import OnboardingOptions from "@components/OnboardingOptions/OnboardingOptions";
import Mnemonics from "@components/Mnemonic/Mnemonic";

const Onboarding = () => {
  const [currentComponent, setCurrentComponent] = React.useState<number>(0);
  const components = [
    <OnboardingOptions currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />,
    <SelectBlockchain currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />,
    <Mnemonics currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />,
  ];

  return <div className={`${styles.onboardingContainer}`}>{components[currentComponent]}</div>;
};

export default Onboarding;
