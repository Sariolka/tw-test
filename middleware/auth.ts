import { process } from 'std-env';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useAuthStore();
  await store.initialize();
  if (process.client && !store.currentToken&& to.path === '/account') {
    return navigateTo('/');
  }
  if (process.client && store.currentToken && to.path === '/') {
    return navigateTo('/account');
  }
});
