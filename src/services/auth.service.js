import Storage from './storage.service';

const storage = new Storage();

export default class AuthService {
    
    // check is user is login or not
    isLoggedIn() {
        return storage.existsStorage('user');
    }

    // check if exist user return user info
    // getUser() {
    //     if(storage.existsStorage('user')) {
    //         return storage.getStorage('user');
    //     }
    // }

    logOut() {
        return storage.clearStorage();
    }
}