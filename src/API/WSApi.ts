import { config } from "../../config";
import { parse } from "../utils";

type TUserInfo = {
  userId: string;
  chatId: string;
  token: string;
};

export interface TActions {
  onopen: (event: Event) => void;
  onclose: (event: CloseEvent) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onmessage: (event: any) => void;
  onerror: (error: Event) => void;
}

export function WSApi(
  { userId, chatId, token }: TUserInfo,
  { onopen, onclose, onmessage, onerror }: TActions,
) {
  const ws = new WebSocket(config.wss.chat(userId, chatId, token));
  ws.addEventListener("open", onopen);
  ws.addEventListener("close", onclose);
  ws.addEventListener("message", (e: MessageEvent) => {
    onmessage(parse(e.data));
  });
  ws.addEventListener("error", (err) => {
    console.warn("ws error: ", err);
    onerror(err);
  });

  return ws;
}
