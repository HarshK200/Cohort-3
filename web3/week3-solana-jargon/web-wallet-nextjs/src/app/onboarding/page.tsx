"use client";
import styles from "./page.module.css";
import React from "react";
import SelectBlockchain from "@components/SelectNetwork/SelectNetwork";
import OnboardingOptions from "@components/OnboardingOptions/OnboardingOptions";
import Mnemonics from "@components/Mnemonic/Mnemonic";
import CreatePassword from "@/components/CreatePassword/CreatePassword";
import axios from "axios";
import { supportedBlockchains } from "@/enums";
import { AnimatePresence, motion } from "framer-motion";

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

  const variants = {
    initial: { opacity: 0, x: 200 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 },
  };

  return (
    <div style={{ overflow: "hidden", height: "100%" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentComponent} // Key ensures that each component change triggers animation
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          className={`${styles.onboardingContainer}`}
        >
          {components[currentComponent]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
