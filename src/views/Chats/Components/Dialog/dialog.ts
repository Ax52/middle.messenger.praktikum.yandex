import Handlebars from "handlebars";
import hbs from "./dialog.hbs";
import css from "./dialog.module.scss";
import {
  Component,
  validateForm,
  formatTime,
  TFormats,
  getChatId,
} from "../../../../utils";

const username = "Sergio";
const messages = [
  {
    author: "Sergio",
    time: "21:12",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    author: "you",
    time: "23:55",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    author: "Sergio",
    time: "02:43",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

type TMessages = {
  messages: Array<{
    author: string;
    time: string;
    message: string;
  }>;
};

export class Dialog extends Component {
  root: HTMLElement;

  override state: TMessages;

  dialogId: string;

  constructor(root: HTMLElement) {
    super(root);
    this.root = root;
    this.state = this.init();
    this.dialogId = getChatId();
  }

  override init() {
    // register helpers
    Handlebars.registerHelper("isYourMessage", (v) => v !== "you");

    // init state
    const state: TMessages = { messages };
    this.state = state;
    return state;
  }

  pushMessage(text: string) {
    const time = formatTime(new Date(), TFormats.short);
    this.setState((prev: TMessages) => ({
      messages: [
        ...prev.messages,
        {
          author: "you",
          time,
          message: text,
        },
      ],
    }));
  }

  async handleSubmit(e: SubmitEvent) {
    const form = e.target as HTMLFormElement;
    try {
      await validateForm(e);
      this.pushMessage(form.message.value);
    } catch (err: unknown) {
      console.error("Error with message form: ", err);
    }
  }

  override addEvents() {
    return [
      {
        event: "submit",
        targetId: "#form-message",
        callback: (e: SubmitEvent) => this.handleSubmit(e),
      },
    ];
  }

  override render() {
    return hbs({ css, username, messages: this.state.messages });
  }
}
