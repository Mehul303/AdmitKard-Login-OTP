import React, { Component } from 'react'
import ReactDom from 'react-dom';
import firebase from './firebase'
import Logo from "./Logo.png"
import mobile from "./mobile.png"
import success from "./success.png"
import "./App.css"
export class App extends Component {
  getPhoneNumberFromUserInput=()=> {
  return document.getElementById('phone-number').value;
  }
  

 
resetRecaptcha=()=> {
  window.recaptchaVerifier.clear()
  return window.recaptchaVerifier.render().then(widgetId => {
   window.RecaptchaVerifier.reset(widgetId);
   } );
}

getCodeFromUserInput=()=> {
  var a = document.getElementById('otpone').value;
  var b = document.getElementById('otptwo').value;
  var c = document.getElementById('otpthree').value;
  var d = document.getElementById('otpfour').value;
  var e = document.getElementById('otpfive').value;
  var f = document.getElementById('otpsix').value;
  var otp = a.concat(b,c,d,e,f);
  return otp;
}
getCountryCode=()=>{
  var e = document.getElementById("countrycode");
  var strUser = e.options[e.selectedIndex].value;   
  return strUser;
}

onVerifyCodeSubmit=(e)=> {
  e.preventDefault();
  if (!!this.getCodeFromUserInput()) {
    window.verifyingCode = true;
    var code = this.getCodeFromUserInput();
    var confirmationResult=window.confirmationResult;
    confirmationResult.confirm(code).then(function (result) {
      // User signed in successfully.
      var user = result.user;
      console.log("Verified");
      document.getElementById('verification-code-form').style.display = 'none';
      document.getElementById('Success').style.display = 'block';
      window.verifyingCode = false;
      window.confirmationResult = null;
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      console.error('Error while checking the verification code', error);
      window.alert('Incorrect OTP, Please try again.'
          );
      window.verifyingCode = false;
    });
  }
}


  handleClick=(e)=>{
    e.preventDefault();
    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
      'size': 'invisible'
  });
    console.log("recaptcha: " + recaptcha);
    var number = this.getPhoneNumberFromUserInput();
    var countrycode=this.getCountryCode();
    number = countrycode.concat(number);
    //console.log(number);
    firebase.auth().signInWithPhoneNumber(number, recaptcha).then( function(confirmationResult) {
      window.confirmationResult = confirmationResult;
      window.signingIn = false;
        if (firebase.auth().currentUser || window.confirmationResult) {
          document.getElementById('sign-in-form').style.display = 'none';
          document.getElementById('verification-code-form').style.display = 'block';
        } else {
          this.resetReCaptcha();
          document.getElementById('sign-in-form').style.display = 'block';
        }
      


    })
    .catch(function (error) {
        console.error( error);

    });
    


    
  }

 

  render() {
    return (
      <div>
      <div id="recaptcha"></div>
		
		  <form action="#" id="sign-in-form" class="phnoform">
      <div class="imgcontainer"> <img src={Logo} alt="Logo" class="pgno1"></img> 
      </div>

      <p style={{fontSize: "30px", color: "black"}}><b>Welcome Back</b></p> 
		  <p style={{fontSize: "20px", color: "grey", marginTop: "-1em", marginBottom: "-1em"}}>Please sign in to your account</p>
		

		  <br/><br/><br/><br/>

      <div class="phnodiv">

      <label class="enterphnolabel" for="phone">Enter a phone number:</label>
			
      <select id="countrycode" name="countrycode">
        <option data-countryCode="DZ" value="213">Algeria (+213)</option>
        <option data-countryCode="AD" value="376">Andorra (+376)</option>
        <option data-countryCode="AO" value="244">Angola (+244)</option>
        <option data-countryCode="IN" value="+91" selected>India (+91)</option>
      </select>
    
      <input type="tel" id="phone-number" name="phone" placeholder="Enter Your Number" pattern="[0-9]{10}" title="Please enter a valid phone number" required/>
    
      </div>

    <br/><br/><br/>
  
    <p style={{fontSize: "15px", color: "grey", marginTop: "-1em"}}>We will send you a one time SMS message.</p>
    <p style={{fontSize: "15px", color: "grey", marginTop: "-1em"}}>Charges may apply</p>
  

    <br/><br/><br/><br/>
  
    <div class="divsigninbtn"> 
      <button type="button"  onClick={this.handleClick} class="signinbtn">Sign In with OTP</button> 
    </div>

    <br/><br/><br/>

    </form>

      <form class="test" id="verification-code-form" action='#'>
      <div class="imgcontainer"> 
			<img src={mobile} alt="Verified" class="pgno2"/> 
		</div> 


	
		<p style={{fontSize: "25px"}}>Please verfiry Mobile number</p>
		
		<p style={{fontSize: "20px", color: "grey"}}>An OTP is sent to your number</p>

		<br/><br/>
      <div id="inputdivOTP">
		<input type="number" id="otpone" autoComplete="none"/>
		<input type="number" id="otptwo" autoComplete="none"/>
		<input type="number" id="otpthree" autoComplete="none"/>
		<input type="number" id="otpfour" autoComplete="none"/>
		<input type="number" id="otpfive" autoComplete="none"/>
		<input type="number" id="otpsix" autoComplete="none"/>
		</div>


		<br/><br/><br/>
		
		

		<div class="divverifybtn"> 
			<button type="button" onClick={this.onVerifyCodeSubmit} class="verifybtn">Verfiy</button> 
		</div> 
      </form>








      <div id="Success" class="test">
      <div class="imgcontainer"> 
			<img src={success} alt="success" class="pgno3"/> 
		</div> 


	
		<p style={{fontSize: "35px"}}><b>Welcome to AdmitKard</b></p>
		<br/>
		<p style={{fontSize: "20px", color: "#A9A9A9", marginTop: 0, marginBottom: 0}}>In order to provide you with</p>
		<p style={{fontSize: "20px", color: "#A9A9A9", marginTop: 0, marginBottom: 0}}>a custom experience,</p>
		<p style={{fontSize: "20px", color: "#A9A9A9", marginTop: 0, marginBottom: 0}}>we need to ask you a few questions.</p>
			



		<br/><br/><br/><br/><br/><br/>
		
	
		
		<div class="divverifybtn"> 
			<button type="button" class="verifybtn"><b>Get Started</b></button> 
		</div> 
		
		<p style={{fontSize: "15px", color: "grey"}} id="fivemins">*This will only take 5 mins.</p>	

      </div>

      </div>
    )
  }
}

export default App
