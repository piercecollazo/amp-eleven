import React from 'react'

export default React.createContext({
    isAuth: false,
    user: null,
    signIn: ()=>{},
    logout:()=>{},
    signUp:()=>{},
    follow:()=>{},
    fillFollowerList:()=>{},
    fillFollowsList:()=>{},
    eventAdd: ()=>{}
})