"use client";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import EnterPassword from "@/components/EnterPassword/EnterPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const router = useRouter();
  const [currentComonent, setCurrentComponent] = React.useState();

  React.useEffect(() => {
    const secureUsers = localStorage.getItem("secureUsers");

    // if user doesn't has an account
    if (!secureUsers) {
      router.push("/onboarding");
    }

    const unlocked = localStorage.getItem("unlocked");
    if (unlocked) {
      router.push("wallet");
    }
  }, []);

  return (
    <main className={`container ${styles.main}`}>
      <ToastContainer />
      <EnterPassword />
    </main>
  );
};

export default Home;
