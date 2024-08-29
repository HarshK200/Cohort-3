"use client";
import styles from "./page.module.css";
import React from "react";
import SelectBlockchain from "@components/SelectNetwork/SelectNetwork";
import OnboardingOptions from "@components/OnboardingOptions/OnboardingOptions";
import Mnemonics from "@components/Mnemonic/Mnemonic";
import CreatePassword from "@/components/CreatePassword/CreatePassword";
import axios from "axios";
import { supportedBlockchains } from "@/enums";
import { ToastContainer } from "react-toastify";

const Onboarding = () => {
  const [currentComponent, setCurrentComponent] = React.useState<number>(0);
  const [mnemonic, setMnemonic] = React.useState<string[]>();
  const [selectedBlockhain, setSelectedBlockchain] = React.useState<supportedBlockchains>(supportedBlockchains.Solana);

  React.useEffect(() => {
    axios.get("/api/generatemnemonic").then((response) => {
      const data = response.data as generatemnemonic_ResponseData;
      setMnemonic(data.mnemonic);
    });
  }, []);

  const components = [
    <OnboardingOptions currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />,
    <SelectBlockchain
      currentComponent={currentComponent}
      setCurrentComponent={setCurrentComponent}
      selectedBlockhain={selectedBlockhain}
      setSelectedBlockchain={setSelectedBlockchain}
    />,
    <Mnemonics currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} mnemonic={mnemonic} />,
    <CreatePassword mnemonic={mnemonic} selectedBlockhain={selectedBlockhain} />,
  ];

  return <div className={`${styles.onboardingContainer}`}>{components[currentComponent]}</div>;
};

export default Onboarding;
