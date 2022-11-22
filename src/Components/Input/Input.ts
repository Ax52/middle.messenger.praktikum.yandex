import { Component } from "../../utils/index";
import hbs from "./Input.hbs";

type TProps = {
  text: string;
  id?: string;
  placeholder?: string;
  clx?: (string | undefined)[];
  attrs?: { tag: string; value: string }[];
  listeners?: [
    {
      event: string;
      callback: <T>(event?: T) => void;
    },
  ];
};

export class Input extends Component {
  props: TProps;

  constructor(root: HTMLElement, props: TProps) {
    const _props = props.listeners
      ? {
          ...props,
          listeners: props.listeners.map((i) => ({
            ...i,
            targetId: `#${props.id}`,
          })),
        }
      : props;
    super(root, _props);
    this.props = props;
  }

  override render() {
    const {
      text,
      id = "",
      clx = [],
      attrs = [],
      placeholder = "",
    } = this.props ?? {};
    return hbs({ id, clx, attrs, text, placeholder });
  }
}
