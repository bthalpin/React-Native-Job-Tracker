import decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';


class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  async isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        await AsyncStorage.removeItem('id_token');
        return true;
      }
      return false;

    } catch (err) {
      console.log(err)
    }
  }

  async getToken() {
    const token = await AsyncStorage.getItem('id_token')||'';
    const tokens = await token
    return tokens
  }

  async login(idToken) {
    await AsyncStorage.setItem('id_token', idToken);

  }

  async logout() {
    await AsyncStorage.removeItem('id_token');
  }
}

export default new AuthService();
