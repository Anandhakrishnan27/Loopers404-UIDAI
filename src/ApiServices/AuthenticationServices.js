import axios from "axios";


export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

 // /authenticate method for backend auth

//     executeJwtAuthenticationService(username, password) {
//         return axios.post(`${API_URL}/authenticate`, {
//             username,
//             password
//         })
//     }

// non jwt token

     createBasicAuthToken(Uid,mobileNo) {
         return 'Basic ' + window.btoa(Uid + ":" + mobileNo)
     }

// non jwt login

    registerSuccessfulLogin(Uid,mobileNo) {
        
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, Uid)
        this.setupAxiosInterceptors(this.createBasicAuthToken(Uid, mobileNo))
    }

//jwt login

//     registerSuccessfulLoginForJwt(username, token) {
//         sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
//         this.setupAxiosInterceptors(this.createJWTToken(token))
//     }

// //jwt token

//     createJWTToken(token) {
//         return 'Bearer ' + token
//     }

//logout

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    
    }

//check if user is logged in

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

//returns username

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

//registers user to the application 

//     registerService(user){
//         return axios.post(`${API_URL}/register`, user);
//     }

//intereptors configuration

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}
// transfers sessionStorage from one tab to another
// var sessionStorage_transfer = function(event) {
//     if(!event) { event = window.event; } // ie suq
//     if(!event.newValue) return;          // do nothing if no value to work with
//     if (event.key == 'getSessionStorage') {
//       // another tab asked for the sessionStorage -> send it
//       localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
//       // the other tab should now have it, so we're done with it.
//       localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
//     } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
//       // another tab sent data <- get it
//       var data = JSON.parse(event.newValue);
//       for (var key in data) {
//         sessionStorage.setItem(key, data[key]);
//       }
//     }
//   };
  
//   // listen for changes to localStorage
//   if(window.addEventListener) {
//     window.addEventListener("storage", sessionStorage_transfer, false);
//   } else {
//     window.attachEvent("onstorage", sessionStorage_transfer);
//   };
  
  
//   // Ask other tabs for session storage (this is ONLY to trigger event)
//   if (!sessionStorage.length) {
//     localStorage.setItem('getSessionStorage', 'foobar');
//     localStorage.removeItem('getSessionStorage', 'foobar');
//   };

export default new AuthenticationService();