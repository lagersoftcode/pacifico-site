import keyStorage from 'key-storage'

export default {
  isLoggedIn: () => { return keyStorage.get('AuthToken') }
}
