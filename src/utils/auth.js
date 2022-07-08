import decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';


class AuthService {
  async getProfile() {
    // console.log('before')
    const token = await this.getToken()
    // console.log(token)
    const profile =await decode(token);
    // console.log(profile)
    return profile
  }

  async loggedIn() {
    const token = await this.getToken();
    if (!token){
      return false
    }
    const expired = await this.isTokenExpired(token)
    return token && !expired;
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
    // console.log('gettingtoken')
    const token = await AsyncStorage.getItem('id_token')||'';
    // console.log(token,'token')
    return token
  }

  async login(idToken) {
    await AsyncStorage.setItem('id_token', idToken);

  }

  async logout() {
    await AsyncStorage.removeItem('id_token');

  }
}

export default new AuthService();
