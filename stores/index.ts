import { defineStore } from 'pinia';
import { process } from 'std-env';

interface AuthState {
  user: null | string;
  token: null | string;
}

export const useAuthStore = defineStore('store', {
  state: (): AuthState => {
    return {
      user: null,
      token: null,
    };
  },
  actions: {
    initialize() {
      if (process.client) {
        this.user = localStorage.getItem('user') || null;
        this.token = localStorage.getItem('token') || null;
      }
    },
    setUser(user: string, token: string): void {
      if (process.client) {
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
        this.user = user;
        this.token = token;
      }
    },
    logout() {
      if (process.client) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.token = null;
        this.user = null;
      }
    },
  },
  getters: {
    currentUser: (state): string | null => state.user,
    currentToken: (state): string | null => state.token,
  },
});
