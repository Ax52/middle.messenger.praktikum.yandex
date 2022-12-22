import { Axios } from "../utils";
import { config } from "../../config";

export type TUser = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export class ChatApi {
  static async login(loginData: Record<string, FormDataEntryValue>) {
    return Axios.json(config.chats.signin, loginData);
  }

  static async register(loginData: Record<string, FormDataEntryValue>) {
    return Axios.json(config.chats.signup, loginData);
  }

  static async getUser() {
    return Axios.get(config.chats.user);
  }

  static async checkAccess() {
    try {
      const res = await ChatApi.getUser();
      return !!res;
    } catch {
      return false;
    }
  }

  static async logout() {
    return Axios.post(config.chats.logout, undefined, {
      headers: [["expires", "0"]],
    });
  }

  static async createChat(title: string) {
    return Axios.json(config.chats.chats, { title });
  }

  static async getChats() {
    return Axios.get(config.chats.chats);
  }

  static async deleteChat(chatId: number) {
    return Axios.delete(config.chats.chats, {
      data: JSON.stringify({ chatId }),
      headers: [["Content-Type", "application/json"]],
    });
  }

  static async getChatToken(chatId: string) {
    return Axios.post(`${config.chats.chatToken}/${chatId}`);
  }

  static async addUserToChat(userId: number, chatId: number) {
    return Axios.put(
      config.chats.addUserToChat,
      JSON.stringify({ users: [userId], chatId }),
      { headers: [["Content-Type", "application/json"]] },
    );
  }

  static async removeUserFromChat(userId: number, chatId: number) {
    return Axios.delete(config.chats.addUserToChat, {
      data: JSON.stringify({ users: [userId], chatId }),
      headers: [["Content-Type", "application/json"]],
    });
  }

  static async changePassword(oldPassword: string, newPassword: string) {
    return Axios.put(
      config.chats.changePassword,
      JSON.stringify({ oldPassword, newPassword }),
      { headers: [["Content-Type", "application/json"]] },
    );
  }

  static async changeUserProfile(userData: TUser) {
    return Axios.put(config.chats.changeUserProfile, JSON.stringify(userData), {
      headers: [["Content-Type", "application/json"]],
    });
  }

  static async setAvatar(avatar: FormData) {
    return Axios.put(config.chats.setAvatar, avatar, {
      headers: [["accept", "application/json"]],
    });
  }

  static getAvatarUrl(url: string) {
    return config.chats.getAvatar(url);
  }
}
