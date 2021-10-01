import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
export default function FooterBase() {
  const [newsLetter, setNewsLetter] = useState("");
  const handleNewsLetter = (e) => {
    let currentValue = e.target.currentValue;
    setNewsLetter(currentValue);
  };
  const subscribeNewsLetter = (e) =>  {
    e.preventDefault();
    toast.info("Subscribe to newsletter with " + newsLetter);
  };
  return (
    <footer>
      <div className="container">
        <div className="row-wrapper">
          <div className="col">
            <img src="/footerlogo.png" className="logo" alt="logo" />
            <p>
              <p>
                <b>CollabSpace</b> provides a way for people to create their
                task, manage themselves or collaborate with others through
                simplicity. With
              </p>
            </p>
          </div>
          <div className="col contact">
            <h5>Newsletter</h5>
            <p>
              Subscribe our newsletter to get our update. We do not send span
              email to you.
            </p>
            <form className={`formSet`}>
              <fieldset>
                <input
                  placeholder="Email Address"
                  onChange={handleNewsLetter}
                />
              </fieldset>
              <button className="default-btn" onClick={subscribeNewsLetter}>
                <img
                  src="https://api.iconify.design/fa-solid/paper-plane.svg?color=white"
                  alt=""
                />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="copyRight">
        <div className="container">
          <p>© 2020 CollabSpace All Right Reserved</p>
          <ul>
            <li>
              <span>Privacy & Policy</span>
            </li>
            <li>
              <span>Support</span>
            </li>
            <li>
              <span>Terms of Services</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
