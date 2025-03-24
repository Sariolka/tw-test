import { defineStore } from 'pinia';
import { process } from 'std-env';

interface AuthState {
  user: null | string;
}

export const useAuthStore = defineStore('store', {
  state: (): AuthState => {
    return {
      user: null,
    };
  },
  actions: {
    initialize() {
      if (process.client) {
        this.user = localStorage.getItem('user') || null;
      }
    },
    setUser(user: string) {
      this.user = user;
      if (process.client) {
        localStorage.setItem('user', user);
      }
    },
    logout() {
      this.user = null;
      if (process.client) {
        localStorage.removeItem('user');
      }
    },
  },
  getters: {
    currentUser: (state) => state.user,
  },
});
