declare namespace IReport {
  interface IResReport {
    status_code: number;
    message: string;
    response: Response;
  }

  interface Response {
    data: T[];
    page: number;
    limit: number;
    offset: number;
    total_pages: number;
    total_count: number;
  }
}
