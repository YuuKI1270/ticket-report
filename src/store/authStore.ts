import { defineStore } from "pinia";
import {
  getPersistedState,
  persistState,
  removePersistedState,
} from "../utils/persist-util";
import router from "../routes/routes";
import { routerPaths } from "../utils/route-util";
import { ref } from "vue";

const AUTH_KEY = import.meta.env.VITE_APP_PERSIST_AUTH;

export const useAuthStore = defineStore("useAuth", () => {
  const localState = !!getPersistedState(AUTH_KEY);
  const auth = ref(localState || false);

  // Method
  function login({
    accessToken,
    refreshToken,
    username,
  }: {
    accessToken: string;
    refreshToken: string;
    username: string;
  }) {
    persistState(AUTH_KEY, {
      username: username,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    auth.value = true;
    router.push({ name: routerPaths.root.name });
  }

  function logout() {
    auth.value = false;
    removePersistedState(AUTH_KEY);
    router.push({ name: routerPaths.login.name });
  }

  return { login, logout, auth };
});
