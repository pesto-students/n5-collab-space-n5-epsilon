// import Image from "next/image";

export default function AboutUs(prop) {
  return (
    <section className="aboutUs">
      <div className="container">
        <div className={prop.showMe ? "row changed" : "row"}>
          <div
            data-sal="slide-right"
            data-sal-duration="900"
            className="content-wrapper"
          >
            <span className="title">ABOUT US</span>
            <h3>Revolutionizing the way people manage themselves </h3>
            <img
              className="responsive-image"
              src={"about-us.png"}
              alt="about us"
            />
            <p>
              <b>CollabSpace</b> provides a way for people to create their task,
              manage themselves or collaborate with others through simplicity.
              With
              <br />
              <b>CollabSpace</b> we offer freedom to model platform as needed
            </p>
            <p>{prop.additionalData}</p>
            <div className="btn-wrapper">
              <span className="default-btn" onClick={prop.handleFeatureClick}>
                Features
              </span>
            </div>
          </div>
          <div
            data-sal="slide-left"
            data-sal-duration="900"
            className="img-wrapper"
          >
            <img src={"scrumboard.svg"} alt="about us" />
          </div>
        </div>
      </div>
    </section>
  );
}
