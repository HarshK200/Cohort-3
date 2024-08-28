import styles from "./OnboardingOptions.module.css";

const OnboardingOptions: React.FC<OnboardingOptsComponentProps> = ({ currentComponent, setCurrentComponent }) => {
  return (
    <main className={`${styles.btnContainer}`}>
      <button
        className={`btn ${styles.createButton}`}
        onClick={() => {
          setCurrentComponent(1);
        }}
      >
        Create wallet
      </button>
      <button className={`btn glass ${styles.importButton}`}>Import wallet</button>
    </main>
  );
};

export default OnboardingOptions;
