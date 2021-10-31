import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//unautheticated access route
class AccessDeniedComponent extends Component {
    render() {
        return (
            
                
                <div className="container">
                 You are logged out,<Link to="/login">Login</Link> to continue
                </div>
            
        )
    }
}


export default AccessDeniedComponent;