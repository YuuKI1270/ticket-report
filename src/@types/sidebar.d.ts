declare namespace ISidebar {
  interface IResSidebar {
    status_code: number;
    message: string;
    response: Sidebar[];
  }
}

interface Sidebar {
  id: number;
  title: string;
  route: string;
}
