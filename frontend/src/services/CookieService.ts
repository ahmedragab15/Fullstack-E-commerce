import Cookies, { type CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

class CookieService {
  get(key: string) {
    return cookies.get(key);
  }
  set(key: string, value: string, options: CookieSetOptions | undefined) {
    return cookies.set(key, value, options);
  }
  remove(key: string) {
    return cookies.remove(key);
  }
}

export default new CookieService();