import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://bookstore-be4af.firebaseio.com'
})

export default instance;