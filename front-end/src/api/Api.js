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
        console.log(results)
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
        console.log(results)
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