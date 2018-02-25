import { AsyncStorage } from 'react-native';
import { AuthApi } from '../../api';

export default (dispatch) => {
  return {
    login: (username, password) => {
      AuthApi.login(username, password)
        .then(result => {
          AsyncStorage.setItem('token', result.token);
          AsyncStorage.setItem('user', JSON.stringify(result.user));

          dispatch({
            type: "MAIN"
          })
        })
        .catch(error => {
          alert(error);
        })
    }
  }
};

