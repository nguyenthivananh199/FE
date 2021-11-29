export default function ({ store, redirect }) {
    // If the user is not authenticated, go to login page
    if (!store.getters['auth/isAuthenticated']) {
        return redirect('/login')
    }
  }