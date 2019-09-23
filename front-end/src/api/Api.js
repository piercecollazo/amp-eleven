import {Axios} from 'axios'
import jwt_decode from 'jwt-decode'

export const apiAuth = ({email, password}) => {
    return new Promise((resolve, reject) => {
      Axios.post('/users/api/sign-in', {
        email,
        password
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

  