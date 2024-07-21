import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import { routerPaths } from "../utils/route-util";
import { useAuthStore } from "../store/authStore";

const HomePage = () => import("../pages/home/index.vue");
const LoginPage = () => import("../pages/login/index.vue");
const ReportPage = () => import("../pages/report/index.vue");
const NotFoundPage = () => import("../pages/not-found/index.vue");

export const routes: RouteRecordRaw[] = [
  {
    path: routerPaths.root.path,
    name: routerPaths.root.name,
    component: HomePage,
  },
  {
    path: routerPaths.login.path,
    name: routerPaths.login.name,
    component: LoginPage,
  },
  {
    path: routerPaths.report.path,
    name: routerPaths.report.name,
    component: ReportPage,
  },
  {
    path: routerPaths.notFound.path,
    name: routerPaths.notFound.name,
    component: NotFoundPage,
  },
];

const basePath = import.meta.env.VITE_API_BASE_PATH;

const router = createRouter({
  routes: routes,
  history: createWebHistory(basePath),
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authed = useAuthStore();

    // check guard for router
    if (to.name !== routerPaths.login.name && !authed.auth) {
      // If not authenticated and not on the login page, redirect to login
      next({ name: routerPaths.login.name });
    } else {
      next();
    }
  }
);
export default router;
