import React from 'react';  
import AuthenticationService from '../ApiServices/AuthenticationServices';
import UidaiApiService  from '../ApiServices/UidaiApiService';
class LoginComponent extends React.Component {  
  constructor(props) {  
      super(props);  
      this.state = {
          value: '',
           b64:'',
           uidNumber:'',
           captchaTxnId:'',
           captchaValue:'',
           transactionId:'MYAADHAAR:59142477-3f57-465d-8b9a-75b28fe48725',
           activateOtp:false,
           otp:'',
           txnNumber:'',
           shareCode:'4567',
           mobileNumber:'0'};  
      this.handleChange = this.handleChange.bind(this);  
      this.handleSubmit = this.handleSubmit.bind(this);  
      this.displaycaptcha=this.displaycaptcha.bind(this);
      this.generateOTP=this.generateOTP.bind(this);
      this.loginClicked=this.loginClicked.bind(this);
  }  
  componentDidMount() {
    console.log('componentDidMount')
    this.displaycaptcha();
    console.log(this.state)
}

displaycaptcha() {
    //retrieve all contacts on route to /contacts
    var str="data:image/png;base64, "
    UidaiApiService.generarteCaptcha({ "langCode": "en", "captchaLength": "3", "captchaType": "2"}).then((response) => {
       var b64str=response.data.captchaBase64String;     
       var concatstr=str+b64str;   
      this.setState({b64:concatstr,captchaTxnId:response.data.captchaTxnId});
  }).catch((err) => {
      console.log(err)
     
  })}
  generateOTP() {
    //retrieve all contacts on route to /contacts
    
    UidaiApiService.generateOTP({ uidNumber:this.state.uidNumber, captchaTxnId:this.state.captchaTxnId,captchaValue:this.state.captchaValue,transactionId:this.state.transactionId},{" x-request-id":"MYAADHAAR:59142477-3f57-465d-8b9a-75b28fe48725","appid":"MYAADHAAR","Content-Type":"application/json"}).then((response) => {
        this.setState({activateOtp:true,txnNumber:response.data.txnId})
        
        }).catch((err) => {
      console.log(err)
     
  })}

  loginClicked() {
   UidaiApiService.fetchEkyc({txnNumber:this.state.txnNumber,otp:this.state.otp,shareCode:this.state.shareCode,uid:this.state.uidNumber},{"Content-Type":"application/json"})
        .then((response) => {
            AuthenticationService.registerSuccessfulLogin(this.state.uidNumber,this.state.mobileNumber)
            this.props.history.push("/welcome")
        }).catch(() => {
            // this.setState({ showSuccessMessage: false })
            // this.setState({ hasLoginFailed: true })
        })
    
 }
  handleChange(event) {  
    this.setState(
      {
          [event.target.name]
              : event.target.value
      }
  )

  }  
  handleSubmit(event) {  
      alert(' captch verified: ' + this.state.value); 
      
      event.preventDefault();  
  }  
  render() {  
      return (  
          <form onSubmit={this.handleSubmit}>  
          <h1>Enter the aadhaar number</h1>
          <input type="text" name="uidNumber" value={this.state.uidNumber} onChange={this.handleChange}/>
            <h1>Enter the captcha</h1>  
            <label>  
                <img src={this.state.b64} alt="Red dot"/>
                <input type="text" name="captchaValue" value={this.state.captchaValue} onChange={this.handleChange} />  
            </label>  
            <input type="submit" value="verify" onClick={this.generateOTP} /> 
            {this.state.activateOtp && <div> <input type="text" name="otp" placeholder="enter otp" value={this.state.otp} onChange={this.handleChange}/></div>}
            <input type="button"  value="submit" onClick={this.loginClicked}/>
         </form>  
      );  
  }  
}  
export default LoginComponent;