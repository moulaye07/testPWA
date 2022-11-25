import axios from 'axios';

export const getProfileFunction = (callbackFunction) => {
  const emailOfUser = localStorage.getItem('email');
  const config = {
    withCredentials: true,
    headers: { Authorization: 'Bearer ' + localStorage.getItem('user') }
  };
  axios
    .get('http://localhost:5000/user/', { emailOfUser: emailOfUser }, config)
    .then(res => {
      callbackFunction(res.data);
    })
    .catch(err => {
      //console.log(err);
      console.log(err)
    });
}
