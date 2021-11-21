import jwt_decode from "jwt-decode";

export default class Storage {

    getStorage (key) { // get any item from LocalStorage
      return localStorage.getItem(key);
    }
    
    setStorage(key, value) { // create any item to LocalStorage
      return localStorage.setItem(key, value);
    }
    
    removeStorage(key) { // Remove LocalStorage By key
      return localStorage.removeItem(key);
    }
    
    existsStorage(key) { // Check on key in localStorage
      return !!localStorage.getItem(key); // return true or false
    }
    
    clearStorage() { // clear all Localstorage 
      return localStorage.clear();
    }
    
    setAccessToken(value) {
      var tokenInfo = this.getDecodedAccessToken(value); // decode token
      this.setUser(tokenInfo);
      return this.setStorage('access_token', value);
    }
    
    setExpiresIn(value) {
      return this.setStorage('expires_in', value);
    }
    
    getExpiresIn() {
      return this.getStorage('expires_in');
    }
    
    setUser(value) {
      return this.setStorage('user', JSON.stringify(value));
    }
    
    getDecodedAccessToken(token) {
      try {
        return jwt_decode(token);
      } catch (Error) {
        return null;
      }
    }
}


