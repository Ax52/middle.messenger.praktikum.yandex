/* eslint-disable @typescript-eslint/no-explicit-any */
enum Methods {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

interface IOptions {
  timeout?: number;
  method?: Methods;
  responseType?: "" | "text" | "json" | "arraybuffer" | "blob" | "document";
  headers?: [string, string][];
  data?: string | Document | XMLHttpRequestBodyInit | null | undefined;
  json?: any;
  query?: Record<string, string>;
}

type TGet = (url: string, options?: IOptions) => Promise<any>;
type TDelete = TGet;
type TPost = (
  url: string,
  data?: IOptions["data"],
  options?: IOptions,
) => Promise<any>;
type TPut = TPost;
type TJson = (
  url: string,
  data?: IOptions["json"],
  options?: IOptions,
) => Promise<any>;

let callStack = 0;

// NOTE: DOS guard
const dosGuard = (wasting = 3_000, parallelLimit = 25) => {
  callStack++;
  setTimeout(() => {
    callStack--;
  }, wasting);
  if (callStack > parallelLimit) {
    return false;
  }
  return true;
};

const request = (
  url: string,
  { method, responseType, data, timeout, headers }: IOptions = {
    timeout: 5000,
    method: Methods.get,
  },
) =>
  dosGuard()
    ? new Promise<any>((res, rej) => {
        const xml = new XMLHttpRequest();
        xml.open(method as string, new URL(url));
        xml.withCredentials = true;
        if (headers && headers?.length) {
          headers.forEach(([name, val]) => {
            xml.setRequestHeader(name, val);
          });
        }
        xml.responseType = responseType ?? "text";
        xml.timeout = timeout as number;
        xml.onload = () => {
          if (xml.status >= 200 && xml.status <= 299) {
            try {
              const parsed = JSON.parse(xml.response);
              res(parsed);
            } catch {
              res(xml.response);
            }
          } else if (xml.responseText) {
            try {
              const { reason } = JSON.parse(xml.responseText);
              rej(reason);
            } catch {
              rej(xml);
            }
          } else {
            rej(xml);
          }
        };
        xml.onerror = () => {
          rej(xml);
        };
        xml.send(data);
      })
    : // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject("Too many requests");

export class Axios {
  static get: TGet = (url, options = { timeout: 5000 }) => {
    const queryStr: string = options.query
      ? `?${new URLSearchParams(options.query).toString()}`
      : "";
    const uri = `${url}${queryStr}`;
    return request(uri, { ...options, method: Methods.get });
  };

  static post: TPost = (url, data, options = { timeout: 5000 }) =>
    request(url, { ...options, data, method: Methods.post });

  static json: TJson = (url, json, options = { timeout: 5000 }) => {
    const data: IOptions["json"] = JSON.stringify(json);
    const headers: IOptions["headers"] = options.headers
      ? [...options.headers, ["Content-Type", "application/json"]]
      : [["Content-Type", "application/json"]];
    return request(url, { ...options, method: Methods.post, headers, data });
  };

  static put: TPut = (url, data, options: IOptions = { timeout: 5000 }) =>
    request(url, { ...options, data, method: Methods.put });

  static delete: TDelete = (url, options = { timeout: 5000 }) =>
    request(url, { ...options, method: Methods.delete });
}
