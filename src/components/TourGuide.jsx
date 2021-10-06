import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useEffect } from "react";
const Tour = dynamic(() => import("reactour"), { ssr: false });
import React from "react";
import { tourConfig } from "../utils/tourSteps";
import e from "cors";

export default function TourGuide() {
  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const closeTour = () => setIsTourOpen(false);

  useEffect(() => {
    const isPlayed = localStorage.getItem("tourPlayed");
    if (isPlayed) {
    } else {
      setIsTourOpen(true);
      localStorage.setItem("tourPlayed", "true");
    }
  }, []);
  return (
    <Tour
      onRequestClose={closeTour}
      steps={tourConfig}
      isOpen={isTourOpen}
      rounded={5}
      onAfterOpen={disableBody}
      onBeforeClose={enableBody}
      disableInteraction
      inViewThreshold={50}
    />
  );
}
