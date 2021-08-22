import Head from "next/head";
import Image from "next/image";
import { getLayout as getEmptyLayout } from "../src/components/layouts/EmptyLayout";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>CollabSpace</h1>
      <Link href="/workspace">
        <a> Let&apos;s Go</a>
      </Link>
    </div>
  );
}

Home.getLayout = getEmptyLayout;
