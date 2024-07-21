import HttpUtil from "../utils/http-util";
import { routerPathApis } from "../utils/route-util";

const REPORT_API = {
  getList: async ({
    start,
    end,
    page,
    size,
    route,
  }: {
    start: string;
    end: string;
    size: string;
    page: string;
    route: string;
  }) => {
    const res: IReport.IResReport = await HttpUtil.get(
      routerPathApis.listTickets.replace("/:id", route),
      {
        params: {
          start_date: start,
          end_date: end,
          page: page,
          size: size,
        },
      }
    );
    return res;
  },

  exportExcel: async ({
    start,
    end,
    route,
  }: {
    start: string;
    end: string;
    route: string;
  }) => {
    const res: BlobPart = await HttpUtil.get(
      routerPathApis.exportExcel.replace("/:id", route),
      {
        params: {
          start_date: start,
          end_date: end,
        },
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([res]));

    // Create a temporary link element and trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `REPORTS ${route
        .slice(1)
        .replace(/_/g, " ")
        .toUpperCase()} FROM ${start} TO ${end}.xlsx`
    ); // Set the desired file name and extension
    document.body.appendChild(link);
    link.click();

    // Clean up: remove the link and revoke the URL object
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};

export default REPORT_API;
