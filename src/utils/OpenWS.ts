import type { TActions } from "../API";
import { ChatApi, WSApi } from "../API";

interface TProps extends TActions {
  chatId: string;
}

export async function OpenWS({ chatId, ...rest }: TProps) {
  try {
    const promises = [ChatApi.getUser(), ChatApi.getChatToken(chatId)];

    const [{ id: userId }, { token }] = await Promise.all(promises);

    if (!userId || !token) {
      throw new Error("Invalid userId or token");
    }

    if (typeof token === "string") {
      return WSApi({ userId, chatId, token }, rest);
    }
    throw new Error(`chat token is not a valid string: ${token}`);
  } catch (err) {
    console.error("Invalid chat token", err);
    return undefined;
  }
}
