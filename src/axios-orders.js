import axios from 'axios';

const instance = axios.create ({
    baseURL: 'https://react-myburger-d08d3.firebaseio.com/'
});

export default instance;
