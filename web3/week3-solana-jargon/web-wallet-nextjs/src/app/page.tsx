import React from "react";
import styles from "./page.module.css";
import Onboarding from "@/components/Onboarding/Onboarding";

export default function Home() {
  // const [userHasAccount, setUserHasAccount] = React.useState<boolean>(false);

  return (
    <main className={`container ${styles.main}`}>
      <Onboarding />
    </main>
  );
}
