"use client";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import EnterPassword from "@/components/EnterPassword/EnterPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const router = useRouter();
  const [unlocked, setUnlocked] = React.useState<object>();
  const [hasHashed_pass, setHasHashedpass] = React.useState<boolean>(false);

  React.useEffect(() => {
    const secureUsers = localStorage.getItem("secureUsers");
    const hashed_pass = localStorage.getItem("hashed_pass");
    if (hashed_pass) {
      setHasHashedpass(true);
    }
    // if user doesn't has an account
    if (!secureUsers) {
      router.push("/onboarding");
      return;
    }
    const unlocked = sessionStorage.getItem("unlocked");
    if (unlocked) {
      setUnlocked(JSON.parse(unlocked));
      router.push("/wallet");
      return;
    }
  }, []);

  if (hasHashed_pass && !unlocked) {
    return (
      <main className={`container ${styles.main}`}>
        <ToastContainer />
        <EnterPassword />
      </main>
    );
  }
};

export default Home;
