import Head from "next/head";
import Image from "next/image";
import { getLayout as getEmptyLayout } from "../src/components/layouts/EmptyLayout";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import sal from 'sal.js'
import AboutUs from "../src/components/homepageComponents/aboutUs";
import FooterBase from "../src/components/homepageComponents/footer";
import Features from "../src/components/homepageComponents/features";
import JoinUs from "../src/components/homepageComponents/joinUs";

export default function Home() {
    sal();


  return (
    <div className='Homepage'>
        <header>
          <img src='/transparentLogo.png'/>
          <div>
              <span className="header-btn">
                  Sign Up
              </span>
          </div>
      </header>
        <AboutUs/>
        <Features/>
        <JoinUs/>
        <FooterBase/>
        {/*<Link href="/workspace">*/}
        {/*  <a> Let&apos;s Go</a>*/}
        {/*</Link>*/}
    </div>
  );
}

Home.getLayout = getEmptyLayout;
