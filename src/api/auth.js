import base64 from 'base-64';

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    // if (username === 'admin' && password === '1') {
    //   return resolve({
    //     name: 'Admin',
    //     address: '123 test street',
    //     postcode: '2761XZ',
    //     city: 'Testington',
    //   });
    // } 
    // return reject('Unauthorised');

    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(username + ':' + password)        
      }
    })
    .then(response => response.json())
    .then(data => {
      let user = data.token.split('.')[1];
      user = user.replace('-', '+').replace('_', '/');
      user = JSON.parse(base64.decode(user));

      resolve({
        token: data.token,
        user: user
      });
    })
    .catch(error => {
      reject('Unauthorised');
    });    
  });
}

export default {
  login
}
