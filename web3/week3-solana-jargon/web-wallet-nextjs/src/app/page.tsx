"use client";
import React from "react";
import styles from "./page.module.css";
import Onboarding from "@/components/Onboarding/Onboarding";

const Home = () => {
  return (
    <main className={`container ${styles.main}`}>
      <Onboarding />
    </main>
  );
};

export default Home;
