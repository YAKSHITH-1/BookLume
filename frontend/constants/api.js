import { Platform } from 'react-native';

const DEFAULT_HOST = 'https://booklume.onrender.com';
const DEFAULT_PORT = '3000';

let host = DEFAULT_HOST;
if (Platform.OS === 'android') {

  host = 'https://booklume.onrender.com';
}

export const API_URL = `${host}:${DEFAULT_PORT}`;

