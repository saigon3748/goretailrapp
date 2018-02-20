import { AsyncStorage } from 'react-native';

const getToday = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch('http://localhost:8080/api/orders', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        }
      })
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });       
    });
  });
}

export default {
  getToday
}
