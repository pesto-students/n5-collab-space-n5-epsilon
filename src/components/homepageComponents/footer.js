import Link from "next/link";
export default function FooterBase(){

    return (<footer>
      <div className="container">
        <div className="row-wrapper">
          <div className="col">
            <img src='/footerlogo.png' className='logo' alt="logo"/>
            <p>Rupeso is a non custodial crypto currency wallet that provides a secure and easy to use experience to an
              average user.</p>
          </div>
          <div className="col list">
            <h5>Quick Links</h5>
            <ul>
              <li><Link href='#'><a>About</a></Link></li>
              <li><Link href='#'><a>Features</a></Link></li>
              <li><Link href='#'><a>Blog</a></Link></li>
              <li><span>Career</span></li>
              <li><span>FAQs</span></li>
              <li><Link href='#'>Contact</Link></li>
            </ul>
          </div>
          <div className="col list">
            <h5>Social</h5>
            <ul>
              <li><Link href='#'><a>Facebook</a></Link></li>
              <li><Link href='#'><a>Twitter</a></Link></li>
              <li><span>YouTube</span></li>
              <li><span>Linkedin</span></li>
            </ul>
          </div>
          <div className="col contact">
            <h5>Newsletter</h5>
            <p>Subscribe our newsletter to get our update. We do not send span email to you.</p>
            <form className={`formSet`}>
              <fieldset>
                <input
                  placeholder='Email Address'/>
              </fieldset>
              <button type='submit' className='default-btn'><img src='https://api.iconify.design/fa-solid/paper-plane.svg?color=white' alt=''/></button>
            </form>
          </div>
        </div>
      </div>
      <div className="copyRight">
        <div className="container">
          <p>© 2020 Rupeso All Right Reserved</p>
          <ul>
            <li><span>Privacy & Policy</span></li>
            <li><span >Support</span></li>
            <li><span>Terms of Services</span></li>
          </ul>
        </div>
      </div>
    </footer>)

}
