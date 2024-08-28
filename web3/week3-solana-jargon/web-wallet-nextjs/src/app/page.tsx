"use client";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const secureUsers = localStorage.getItem("secureusers");
  if (!secureUsers) {
    router.push("/onboarding");
  }

  return <main className={`container ${styles.main}`}></main>;
};

export default Home;
