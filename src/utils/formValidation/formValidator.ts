const FieldTypes = {
  first_name: "first_name",
  second_name: "second_name",
  login: "login",
  email: "email",
  password: "password",
  newPassword: "new_password",
  phone: "phone",
  message: "message",
} as const;

export type TFormData = [typeof FieldTypes[keyof typeof FieldTypes], string];

function isOk([type, value]: TFormData) {
  let reg: RegExp;
  switch (type) {
    case FieldTypes.first_name:
    case FieldTypes.second_name:
      reg = /^[А-ЯЁA-Z]{1}([а-яёa-z]|-[А-ЯЁA-Zа-яёa-z]{1}[а-яёa-z])*$/;
      break;
    case FieldTypes.login:
      reg = /^(?=.*?([a-zA-Z]|-|_))(\w|-|_){3,20}$/;
      break;
    case FieldTypes.email:
      reg =
        // eslint-disable-next-line
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      break;
    case FieldTypes.password:
      reg = /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/;
      break;
    case FieldTypes.newPassword:
      reg = /^((?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}|\w{0,0})$/;
      break;
    case FieldTypes.phone:
      reg = /^\+?\d{10,15}$/;
      break;
    case FieldTypes.message:
    default:
      reg = /[\s\S]+/;
      break;
  }
  return reg.test(value);
}

export const formValidatior = (formData: TFormData[] = []) =>
  formData.reduce<[] | TFormData[]>((a, b) => (isOk(b) ? a : [...a, b]), []);
