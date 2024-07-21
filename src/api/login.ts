import { routerPathApis } from "../utils/route-util";
import HttpUtil from "../utils/http-util";

const LOGIN_API = {
  getLogin: async (formData: FormData) => {
    const res: ILogin.Response = await HttpUtil.post(
      routerPathApis.login,
      formData
    );
    return res;
  },
};

export default LOGIN_API;
