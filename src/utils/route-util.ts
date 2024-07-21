export const routerPaths = {
  root: {
    path: "/",
    name: "Home",
  },
  login: {
    path: "/login",
    name: "Login",
  },
  report: {
    path: "/:id",
    name: "Reports",
  },
  notFound: {
    path: "/not-found",
    name: "Not-Found",
  },
};

export const routerPathApis = {
  sidebar: "/sidebar",
  listTickets: "report/:id",
  exportExcel: "report/export/:id",
  login: "/auth/login",
};
