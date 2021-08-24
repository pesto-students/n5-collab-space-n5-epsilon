import { getLayout as getEmptyLayout } from "../src/components/layouts/EmptyLayout";
import Link from "next/link";
import AboutUs from "../src/components/homepageComponents/aboutUs";
import FooterBase from "../src/components/homepageComponents/footer";
import Features from "../src/components/homepageComponents/features";
import JoinUs from "../src/components/homepageComponents/joinUs";
import React, { useEffect, useState } from "react";
import sal from "sal.js";
import { useRef } from "react";

export default function Home() {
  sal();
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("user"))?.name);
  }, []);

  const featureRef = useRef();
  function handleFeatureClick() {
    // Scroll back to the title element...
    featureRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }
  return (
    <div className="Homepage">
      <header>
        <img src="/transparentLogo.png" />
        <div className="side-wrapper">
          {!username && (
            <Link href="/auth">
              <a className="header-btn"> Get Started</a>
            </Link>
          )}
          {username && (
            <Link href="/workspace">
              <a className="header-btn">Let&apos;s Go</a>
            </Link>
          )}
          {username && (
            <div className="user-profile">
              <span className="icon">
                <span>{username}</span>
              </span>
            </div>
          )}
        </div>
      </header>
      <AboutUs handleFeatureClick={handleFeatureClick} />
      <Features featureRef={featureRef} />
      <JoinUs />
      <FooterBase />
      {/*<Link href="/workspace">*/}
      {/*  <a> Let&apos;s Go</a>*/}
      {/*</Link>*/}
    </div>
  );
}

Home.getLayout = getEmptyLayout;
