import styles from "./Onbaording.module.css";
import React from "react";
import SelectBlockchain from "@/components/SelectNetwork/SelectNetwork";
import OnboardingOptions from "@/components/OnboardingOptions/OnboardingOptions";

const Onboarding = () => {
  const [currentComponent, setCurrentComponent] = React.useState<number>(0);
  const components = [
    <OnboardingOptions currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />,
    <SelectBlockchain currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />,
  ];

  return <main className={`${styles.onboardingContainer}`}>{components[currentComponent]}</main>;
};

export default Onboarding;
