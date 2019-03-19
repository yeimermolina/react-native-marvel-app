import axios from 'axios';
import md5 from 'md5';

// SET NECESSARY ENV FOR MARVEL API
const PUBLIC_KEY = 'f57374affc5c48ad4508d879cefe94f2';
const PRIVATE_KEY = '2b30814e6272d36c137559f8279a974465f047d9';
const TS = Date.now();
const hash = md5(TS + PRIVATE_KEY + PUBLIC_KEY);

const instance = axios.create({
    baseURL: 'https://gateway.marvel.com//v1/public'
});

instance.defaults.params = {
    apikey: PUBLIC_KEY,
    hash: hash,
    ts: TS
}

export default instance;
