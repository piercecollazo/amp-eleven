import {Axios} from './Axios'
import jwt_decode from 'jwt-decode'


export const apiSignIn = ({email, pass, remember}) => {
    console.log(email, pass)
    return new Promise((resolve, reject) => {
      Axios.post('/users/api/sign-in', {
        email: email,
        password: pass
      })
      .then( results => {

        const  { token } = results.data;
        
        localStorage.setItem('jwtToken', token);
  
        const decodedToken = jwt_decode(token);
        console.log(decodedToken)
        resolve(decodedToken)
      })
      .catch( error => {
        reject(error);
      });
    });
  }

  export const apiSignUp = ({email, pass, username, creator}) => {
    console.log(email, pass)
    return new Promise((resolve, reject) => {
      Axios.post('/users/api/sign-up', {
        email: email,
        username: username,
        password: pass,
        creator: creator
      })
      .then( results => {
        const  { token } = results.data;
        
        localStorage.setItem('jwtToken', token);
  
        const decodedToken = jwt_decode(token);
  
        resolve(decodedToken)
      })
      .catch( error => {
        reject(error);
      });
    });
  }

  export const apiUserGet = (user)=>{
    return new Promise((resolve, reject)=>{
      Axios.get(`users/api/profile/${user}`)
           .then(results => {
             resolve(results)
           })
           .catch(error => {
             reject(error)
           })
    })
  }

  export const apiUserFollow = (target, user)=>{
    return new Promise((resolve, reject)=>{
      Axios.post(`users/api/follow/${target}/${user}`)
           .then(results =>{
             resolve(results)
           })
           .catch(error => {
             reject(error)
           })
    })
  }

  export const apiUserUpdate = ({email, pass, username, creator, genres}, id)=>{
    return new Promise((resolve, reject)=>{
      Axios.post(`users/api/edit-profile`,{
        email: email,
        password: pass,
        profile:{
          username: username,
          picture: ''
        },
        creator: creator,
        genres: genres

      })
    })

  }

export const apiEventCreate = ({creator, event, eventTitle, date, location, venue, price })=>{
  return new Promise((resolve, reject)=>{
    Axios.post(`api/create-event`)
         .then(event =>{
           resolve(event)
         })
         .catch(error =>{
           reject(error)
         })
  })

}