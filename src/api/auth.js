import base64 from 'base-64';
import Config from '../config';

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    fetch(Config.API + '/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(username + ':' + password)        
      }
    })
    .then(response => response.json())
    .then(payload => {
      let user = payload.token.split('.')[1];
      user = user.replace('-', '+').replace('_', '/');
      user = JSON.parse(base64.decode(user));

      resolve({
        token: payload.token,
        user: user
      });
    })
    .catch(error => {
      reject('Incorrect login ID or password');
    });    
  });
}

const logout = () => {
  return new Promise((resolve, reject) => {
    resolve(); 
  });
}

export default {
  login,
  logout
}
