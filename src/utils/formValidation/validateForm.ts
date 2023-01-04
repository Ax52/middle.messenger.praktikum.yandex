import { formValidatior, TFormData } from "./formValidator";
import { EventBus } from "../EventBus";
import css from "../utils.module.scss";

export function validateForm(
  event: SubmitEvent,
): Promise<Record<string, FormDataEntryValue>> {
  event.preventDefault();

  const form = event.target as HTMLFormElement;

  return new Promise((res, rej) => {
    if (!form) {
      rej();
    }

    const invalidFields = formValidatior([
      ...new FormData(form as HTMLFormElement),
    ] as TFormData[]);

    if (invalidFields.length) {
      invalidFields.forEach(([fieldName]) => {
        const input = form.elements.namedItem(fieldName) as HTMLInputElement;
        input.classList.add(css["input-error"] as string);

        const eventBus = new EventBus(input);

        const listen = (evt: string) =>
          function checkVal() {
            const val = input.value;
            const inputValidation = formValidatior([[fieldName, val]]);
            if (!inputValidation.length) {
              input.classList.remove(css["input-error"] as string);
              eventBus.off(evt, checkVal);
            }
          };

        /** NOTE:
         * onBlur/onFocus validations added only after submit check fails. and only on invalid fields.
         * it works almost the same as react-hook-form does. It allows to enter any information in the field
         * and doesn't warns before you double check form and tap "submit" button. With this logic we doesn't
         * get any warns on empty fields focus. Futhermore, if field is checked as invalid after submit, it
         * starts to listen every input change and dynamically says that user fixed the error
         */
        eventBus.on("focus", listen("focus"));
        eventBus.on("input", listen("input"));
        eventBus.on("blur", listen("blur"));
      });
    } else {
      const formObject = [...new FormData(form)].reduce<
        Record<string, FormDataEntryValue>
      >((a, [key, val]) => ({ ...a, [key]: val }), {});
      res(formObject);
    }
  });
}
