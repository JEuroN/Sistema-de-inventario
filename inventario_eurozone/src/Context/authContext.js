import React, { Component, createContext } from 'react'

export const AuthContext = createContext();

class AuthCont extends Component{
    state = {
        isAuth: '',
        isId: '',
        isAdmin: false
    }


    toggleAuth = (name, id) => {
        this.setState({
            isAuth: name,
            isId: id,
            isAdmin: this.state.isAdmin
        })
    }

    toggleAdmin = (name, id) => {
        this.setState({
            isAuth: name,
            isId: id,
            isAdmin: !this.state.isAdmin
        })
    }

    resetState = () =>{
        this.setState({
            isAuth: '',
            isId: '',
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