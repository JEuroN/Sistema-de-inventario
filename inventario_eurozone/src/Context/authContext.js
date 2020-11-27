import React, { Component, createContext } from 'react'

export const AuthContext = createContext();

class AuthCont extends Component{
    state = {
        isAuth: '',
        isAdmin: false
    }


    toggleAuth = (name) => {
        this.setState({
            isAuth: name,
            isAdmin: this.state.isAdmin
        })
    }

    toggleAdmin = (name) => {
        this.setState({
            isAuth: name,
            isAdmin: !this.state.isAdmin
        })
    }

    resetState = () =>{
        this.setState({
            isAuth: '',
            isAdmin: false
        })
    }

    render(){
        return(
            <AuthContext.Provider value={{...this.state, resetState: this.resetState, toggleAuth: this.toggleAuth, toggleAdmin: this.toggleAdmin}}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthCont;