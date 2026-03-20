import { Platform } from 'react-native';

const DEFAULT_HOST = 'https://booklume.onrender.com';

let host = DEFAULT_HOST;
if (Platform.OS === 'android') {

  host = 'https://booklume.onrender.com';
}

export const API_URL = `${host}`;

