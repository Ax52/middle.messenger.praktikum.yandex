/* eslint-disable camelcase */
import { EventBus, Popup, validateForm } from "../../../../../utils";
import type { TUser } from "../../../../../API/ChatApi";
import { ChatApi } from "../../../../../API";

export class FormHandler {
  #avatarInput: HTMLInputElement;

  #avatarImg?: HTMLImageElement;

  #avatarButton: HTMLButtonElement;

  #first_name: HTMLInputElement;

  #second_name: HTMLInputElement;

  #userId: HTMLInputElement;

  #login: HTMLInputElement;

  #email: HTMLInputElement;

  #phone: HTMLInputElement;

  #old_password: HTMLInputElement;

  #new_password: HTMLInputElement;

  #css: Record<string, string>;

  #submitBtn: HTMLButtonElement;

  #formUnlocked: boolean;

  #bus: EventBus;

  constructor(form: HTMLFormElement, css: Record<string, string>) {
    this.#avatarInput = form.avatar;
    this.#avatarButton = form.set_avatar;
    this.#first_name = form.first_name;
    this.#second_name = form.second_name;
    this.#userId = form.user_id;
    this.#login = form.login;
    this.#email = form.email;
    this.#phone = form.phone;
    this.#old_password = form.old_password;
    this.#new_password = form.new_password;
    this.#submitBtn = form["save-btn"];
    this.#css = css;
    this.#formUnlocked = false;
    this.#bus = new EventBus(form);

    this.#fetchValues().then((data) => {
      this.#setValues(data);
    });
    this.#registerListeners();
  }

  #setValues(userData: Record<string, string>) {
    this.#first_name.value = userData.first_name ?? "";
    this.#second_name.value = userData.second_name ?? "";
    this.#userId.value = userData.id ?? "";
    this.#login.value = userData.login ?? "";
    this.#email.value = userData.email ?? "";
    this.#phone.value = userData.phone ?? "";
    if (userData.avatar) {
      this.#renderAvatar(userData.avatar);
    }
  }

  #renderAvatar(url: string) {
    const imgDiv = document.createElement("img");
    imgDiv.setAttribute("src", ChatApi.getAvatarUrl(url));
    imgDiv.setAttribute("alt", "avatar");
    imgDiv.classList.add(this.#css["avatar-img"] ?? "");
    this.#avatarImg = imgDiv;
    this.#avatarButton.appendChild(imgDiv);
  }

  async #fetchValues() {
    try {
      const result = await ChatApi.getUser();
      return result;
    } catch (err) {
      console.error("failed to fetch user data ");
      return undefined;
    }
  }

  async #setDisabled(isDisabled: boolean) {
    if (isDisabled) {
      this.#second_name.setAttribute("disabled", "true");
      this.#first_name.setAttribute("disabled", "true");
      this.#login.setAttribute("disabled", "true");
      this.#email.setAttribute("disabled", "true");
      this.#phone.setAttribute("disabled", "true");
    } else {
      this.#second_name.removeAttribute("disabled");
      this.#first_name.removeAttribute("disabled");
      this.#login.removeAttribute("disabled");
      this.#email.removeAttribute("disabled");
      this.#phone.removeAttribute("disabled");
    }
  }

  async #chechPass() {
    try {
      await ChatApi.changePassword(
        this.#old_password.value,
        this.#old_password.value,
      );
      return true;
    } catch {
      return false;
    }
  }

  async submitNewPass() {
    try {
      await ChatApi.changePassword(
        this.#old_password.value,
        this.#new_password.value,
      );
      Popup("Password chaged successfully", "success");
    } catch (err) {
      console.warn(err);
      if (typeof err === "string") {
        Popup(err, "warn");
      }
    }
  }

  #changeFormLock(isUnlock: boolean) {
    if (isUnlock) {
      Popup("Form is unlocked!", "success");
      this.#setDisabled(false);
    } else {
      this.#setDisabled(true);
    }
    this.#formUnlocked = isUnlock;
    this.#submitBtn.textContent = isUnlock ? "Save" : "Edit";
  }

  async #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.#formUnlocked) {
      // NOTE: send new data
      const newUserData = await validateForm(e);
      newUserData.display_name = "";
      if (this.#new_password.value) {
        this.submitNewPass();
      }
      try {
        await ChatApi.changeUserProfile(newUserData as TUser);
        Popup("New data saved!", "success");
        this.#changeFormLock(false);
      } catch (err) {
        let errText = "Failed to save new user data";
        if (typeof err === "string") {
          errText = err;
        }
        Popup(errText, "error");
      }
    } else {
      // NOTE: unlock form
      const isPassValid = await this.#chechPass();
      if (!isPassValid) {
        Popup("Enter valid old password to unlock", "warn");
      }
      this.#changeFormLock(isPassValid);
    }
  }

  async #sendAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      await ChatApi.setAvatar(formData);
    } catch (err) {
      let errText = "Failed to save avatar";
      if (typeof err === "string") {
        errText = err;
      }
      Popup(errText, "error");
    }
  }

  async #handleAvatarClick(e: PointerEvent) {
    if (e.target === this.#avatarButton || e.target === this.#avatarImg) {
      this.#avatarInput.click();
      this.#avatarInput.oninput = () => {
        const file = this.#avatarInput.files?.[0];
        if (file) {
          this.#sendAvatar(file);
        }
      };
    }
  }

  #registerListeners() {
    this.#bus.on("submit", (e: SubmitEvent) => this.#handleSubmit(e));
    this.#bus.on("click", (e: PointerEvent) => this.#handleAvatarClick(e));
  }
}
