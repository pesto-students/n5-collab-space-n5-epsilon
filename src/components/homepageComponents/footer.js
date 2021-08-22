import React, { useState } from "react"
import ListLink from "./listlink"
import { Link } from "gatsby"
import { Textbox, } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import axios from "axios"
import { connect } from "react-redux"


class FooterBase extends React.Component {

  constructor(props) {
    super(props);
    this.validateForm = this.validateForm.bind(this);
  }
  state = {
    type: 'newsletter',
    email: "",
    hasEmailError: true,
    validate: false,
    formState: ''
  };

  submitForm = (recaptchaToken) => {
    // console.log(this.state);
    const data = this.state;
    delete  data.hasEmailError;
    delete  data.validate;
    delete data.formState;
    data['recaptcha_token'] = recaptchaToken;
    axios.post('https://web.rupeso.io/contact-form', data,)
      .then(res => {
        if (res.status === 200) {
          // todo: handle success
          this.setState({
            formState : 'success',
            hasEmailError: true,
            validate: false,
            email : ''
            });
          setTimeout( () =>  this.setState({ formState : '',  email: "", hasEmailError: true, validate: false}) , 4000);
          // console.log(this.state.formState)
        } else {
          // todo: handle fail
          this.setState({ formState : 'fail'});
          setTimeout( () =>   this.setState({ formState : '', email: "", hasEmailError: true, validate: false,}) , 4000);
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  toggleValidating(validate) {
    this.setState({ validate: validate });
  }

  validateForm(e) {
    e.preventDefault();
    this.toggleValidating(true);
    // console.log(this.state);
    if (
        !this.state.hasEmailError
    ) {
      this.props.addRCCallback(this.submitForm)
      this.props.recaptchaInstance.execute()
    }
  }

  render() {
    return (<footer>
      <div className="container">
        <div className="row-wrapper">
          <div className="col">
            <img src={require('../images/Logo.png')} className='logo' alt="logo"/>
            <p>Rupeso is a non custodial crypto currency wallet that provides a secure and easy to use experience to an
              average user.</p>
          </div>
          <div className="col list">
            <h5>Quick Links</h5>
            <ul>
              <ListLink to='/about'>About</ListLink>
              <ListLink to='/features'>Features</ListLink>
              <ListLink to='/blog'>Blog</ListLink>
              <li><span>Career</span></li>
              <li><a target={'_blank'} href={'https://rupeso.freshdesk.com/support/solutions/44000743267'}>FAQs</a></li>
              <ListLink to='/contact'>Contact</ListLink>
            </ul>
          </div>
          <div className="col list">
            <h5>Social</h5>
            <ul>
              <li><a href={'https://www.facebook.com/Rupeso-100369844705909/'}>Facebook</a></li>
              <li><a target={'_blank'} href={'https://twitter.com/Rupeso_Crypto'}>Twitter</a></li>
              {/*<li><span>YouTube</span></li>*/}
              {/*<li><span>Linkedin</span></li>*/}
            </ul>
          </div>
          <div className="col contact">
            <h5>Newsletter</h5>
            <p>Subscribe our newsletter to get our update. We don't send span email to you.</p>
            <form className={`formSet ${this.state.formState ==='success' ? "success" : ""} ${this.state.formState ==='fail' ? "fail" : ""}`} onSubmit={this.validateForm} method={'post'}>
              <fieldset>
                <Textbox
                  placeholder='Email Address'
                  type='text'
                  name='email'
                  value={this.state.email}
                  attributesInput={{ // Optional.
                    name: 'email',
                    type: 'text',
                    placeholder: 'Email Address',
                  }}
                  classNameContainer='field'
                  onChange={ value => { this.setState({ email: value }); }}
                  onBlur={() => {
                  }}
                  validationCallback={res => this.setState({hasEmailError: res}) }
                  validate={(this.state.hasEmailError && this.state.validate)}
                  validationOption={{
                    name: "email",
                    check: true,
                    required: true,
                    msgOnError: 'Field Required',
                    customFunc: email => {
                      const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                      if (reg.test(String(email).toLowerCase())) {
                        return true;
                      } else {
                        return "Enter valid email";
                      }
                    }
                  }}/>
              </fieldset>
              <button type='submit' onClick={() => this.submitForm} className='default-btn'><img src={require('../images/send.svg')} alt=''/></button>
              <span className='formSubmission'>
                {this.state.formState ==='success' ? "Newsletter Subscribed" : ""}
                {this.state.formState ==='fail' ? "Something went wrong! Please try again later" : ""}
              </span>
            </form>
          </div>
        </div>
      </div>
      <div className="copyRight">
        <div className="container">
          <p>© 2020 Rupeso All Right Reserved</p>
          <ul>
            <li><Link to={'/privacy-policy'}>Privacy & Policy</Link></li>
            <li><a href={'https://rupeso.freshdesk.com/support/home'} target={'_blank'}>Support</a></li>
            <li><Link to={'/terms-of-service'}>Terms of Services</Link></li>
          </ul>
        </div>
      </div>
    </footer>)
  }

}

const mapStateToProps = ({ recaptchaInstance }) => {
  return { recaptchaInstance }
}

const mapDispatchToProps = dispatch => {
  return {
    addRCCallback: (callback) => dispatch({ type: `ADD_SUBMITFUNCTION`, data:callback })
  }
}

const Footer = connect(mapStateToProps, mapDispatchToProps)(FooterBase)

export default Footer
