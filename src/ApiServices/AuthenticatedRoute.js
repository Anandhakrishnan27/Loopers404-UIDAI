import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from './AuthenticationServices'

class AuthenticatedRoute extends Component {
    render() {
        //Check if user logged in and return props
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/oops" />
        }

    }
}

export default AuthenticatedRoute;