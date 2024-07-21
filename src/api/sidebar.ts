import HttpUtil from "../utils/http-util";
import { routerPathApis } from "../utils/route-util";

const SIDEBAR_API = {
  getList: async () => {
    const res: ISidebar.IResSidebar = await HttpUtil.get(
      routerPathApis.sidebar
    );
    return res;
  },
};

export default SIDEBAR_API;
