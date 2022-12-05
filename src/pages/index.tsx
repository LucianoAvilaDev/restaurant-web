import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import InputText from "../components/atomic-design/atoms/InputText";
import Test from "../components/atomic-design/templates/Test";

export default function Home() {
  return (
    <div className={styles.container}>
      <Test />
    </div>
  );
}
