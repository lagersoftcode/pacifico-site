import localStorage from 'key-storage'

export default {
  isLoggedIn: () => { return localStorage.get('auth') }
}
