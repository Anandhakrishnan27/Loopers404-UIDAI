import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginComponent from './LoginComponent';
import AuthenticatedRoute from '../ApiServices/AuthenticatedRoute';
import AccessDeniedComponent from './AccessDeniedComponent';
import welcomeComponent  from './welcomeComponent';
class UidaiComponent extends Component{
     render()
     {return (
          <div className="UidaiComponents">
               <Router>
<>
<Switch>
     <Route path="/" exact component={LoginComponent}/>
     <Route path="/login" component={LoginComponent}/>
      <Route path="/oops" component={AccessDeniedComponent}/>
     <AuthenticatedRoute path="/welcome" component={welcomeComponent}/>


{/* <Route component={ErrorComponent} */}
     </Switch>
</>
      </Router>
      </div>
     )
     }
}
export default UidaiComponent;