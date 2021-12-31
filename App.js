import React from 'react'
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import firebase from './firebase'
class App extends React.Component{
  handleChange = (e) =>{
    const{name, value} = e.target
    this.setState(
      {
        [name]:value
      }
    )
  }

  configureCaptcha = ()=>{
        const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptcha verified")
  },
  defaultCountry : "USA"
}, auth);
  }
  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    const phoneNumber = "+1" + this.state.mobile
    const appVerifier = window.recaptchaVerifier;
    console.log(phoneNumber)
    
    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not sent")
        });

  }
  onSubmitOTP = (e) => {
    e.preventDefault()
    const code = this.state.OTP
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      alert("User is verified")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  render(){
    return(
      <div>
        <h2>
          Login Form
        </h2>
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
          <input type="number" name="mobile" placeholder="Mobile number" require onChange={this.handleChange}/>
          <button type="check">Check</button>
        </form>

        <form onSubmit ={this.onSubmitOTP}>
          <input type="number" name="OTP" placeholder="otp number" require onChange={this.handleChange}/>
          
        </form>
        <form>
        <button type="submit">Submit</button>
        </form>
        
      </div>
    )
  }
}
export default App;
