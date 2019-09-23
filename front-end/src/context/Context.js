import React from 'react'

export default React.createContext({
    isAuth: false,
    user: null,
    signIn: ()=>{},
    logout:()=>{},
    signUp:()=>{},
    follow:()=>{},
    userFetch:()=>{},
    ticketBuy:()=>{}
})