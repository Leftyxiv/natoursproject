import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'post',
      name,
      email,
      password,
      passwordConfirm,
    });

    if (res.data.status === 'success') {
      showAlert('success', `Successfully registered new account, ${name}!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

