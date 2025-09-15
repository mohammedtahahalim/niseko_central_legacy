import type { TServerError } from "./types";

export const serverErrors: TServerError = {
  en: {
    400: "Bad Request",
    401: "Unautorized",
    403: "Lack Permission",
    405: "Method Not Allowed",
    500: "Internal Sever Error",
    522: "Server Under Maintenance",
  },
  jp: {
    400: "不正なリクエスト",
    401: "権限がありません",
    403: "権限がありません",
    405: "メソッドが許可されていません",
    500: "内部サーバーエラー",
    522: "サーバーはメンテナンス中です",
  },
};
