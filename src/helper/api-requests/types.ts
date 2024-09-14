export type Messages = string | string[] | { [key: string]: string | string[] };

export type SuccessApiResponse = {
    success: boolean;
    code: number;
    msg?: string;
    data: {
      [key: string]: any;
    };
}
