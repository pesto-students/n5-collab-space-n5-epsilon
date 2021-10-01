import React from "react";

export default function Features({ featureRef }) {
  return (
    <section className="choose-cypherchange">
      <div className="landing-container" ref={featureRef}>
        <div className="section-intro">
          <h3>Why choose CollabSpace</h3>
          <p>The most safest and trusted Task Management System</p>
        </div>
        <div className="outer-wrapper">
          <div
            className="feature"
            data-sal="slide-up"
            data-sal-duration="1200"
            data-sal-easing="ease-in-back"
          >
            <div className="image-wrapper">
              <img
                src="https://api.iconify.design/la/user-lock.svg?color=white"
                alt="icon"
              />
            </div>
            <div className="content-wrapper">
              <h4>Multi level protection</h4>
              <p>Secure your projects with multi-layer protection.</p>
            </div>
          </div>
          <div
            className="feature"
            data-sal="slide-up"
            data-sal-delay="150"
            data-sal-duration="1200"
            data-sal-easing="ease-in-back"
          >
            <div className="image-wrapper">
              <img
                src="https://api.iconify.design/bi/kanban.svg?color=white"
                alt="icon"
              />
            </div>
            <div className="content-wrapper">
              <h4>Faster Collaboration</h4>
              <p>Link your Projects and Tasks for a faster collaboration</p>
            </div>
          </div>
          <div
            className="feature"
            data-sal="slide-up"
            data-sal-delay="300"
            data-sal-duration="1200"
            data-sal-easing="ease-in-back"
          >
            <div className="image-wrapper">
              <img
                src="https://api.iconify.design/teenyicons/nextjs-outline.svg?color=white"
                alt="icon"
              />
            </div>
            <div className="content-wrapper">
              <h4>Best industry practice</h4>
              <p>CollabSpace is built on multiple hot technologies</p>
            </div>
          </div>
          <div
            className="feature"
            data-sal="slide-up"
            data-sal-delay="450"
            data-sal-duration="1200"
            data-sal-easing="ease-in-back"
          >
            <div className="image-wrapper">
              <img
                src="https://api.iconify.design/whh/salealt.svg?color=white"
                alt=""
                srcSet=""
              />
            </div>
            <div className="content-wrapper">
              <h4>Defining Package Limits</h4>
              <p>
                Personalize your projects in accordance to your needs for free
              </p>
            </div>
          </div>
          <div
            className="feature"
            data-sal="slide-up"
            data-sal-delay="600"
            data-sal-duration="1200"
            data-sal-easing="ease-in-back"
          >
            <div className="image-wrapper">
              <img
                src="https://api.iconify.design/eos-icons/secure-data-outlined.svg?color=white"
                alt=""
                srcSet=""
              />
            </div>
            <div className="content-wrapper">
              <h4>24/7 Support</h4>
              <p>We value your time. Get instant help any time of the day.</p>
            </div>
          </div>
          <div
            className="feature"
            data-sal="slide-up"
            data-sal-delay="750"
            data-sal-duration="1200"
            data-sal-easing="ease-in-back"
          >
            <div className="image-wrapper">
              <img
                src="https://api.iconify.design/carbon/share-knowledge.svg?color=white"
                alt=""
                srcSet=""
              />
            </div>
            <div className="content-wrapper">
              <h4>Secure Storage</h4>
              <p>
                Majority of users digital assets are stored in offline
                environment.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
