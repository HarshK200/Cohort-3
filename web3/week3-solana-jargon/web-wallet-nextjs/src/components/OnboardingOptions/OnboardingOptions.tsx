import styles from "./OnboardingOptions.module.css";

interface ComponentProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
}

const OnboardingOptions: React.FC<ComponentProps> = ({ currentComponent, setCurrentComponent }) => {
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
