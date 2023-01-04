export const config = {
  chats: {
    host: "https://ya-praktikum.tech/api/v2",
    get user() {
      return `${this.host}/auth/user`;
    },
    get signin() {
      return `${this.host}/auth/signin`;
    },
    get signup() {
      return `${this.host}/auth/signup`;
    },
    get logout() {
      return `${this.host}/auth/logout`;
    },
    get chats() {
      return `${this.host}/chats`;
    },
    get addUserToChat() {
      return `${this.host}/chats/users`;
    },
    get chatToken() {
      return `${this.host}/chats/token`;
    },
    get changePassword() {
      return `${this.host}/user/password`;
    },
    get changeUserProfile() {
      return `${this.host}/user/profile`;
    },
    get setAvatar() {
      return `${this.host}/user/profile/avatar`;
    },
    getAvatar(url: string) {
      return `${this.host}/resources${url}`;
    },
  },
  wss: {
    host: "wss://ya-praktikum.tech/ws/chats",
    chat(userId: string, chatId: string, token: string) {
      return `${this.host}/${userId}/${chatId}/${token}`;
    },
  },
};
