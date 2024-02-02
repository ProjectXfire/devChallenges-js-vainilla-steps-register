const nameErrorRequired = "Name must required";
const emailErrorRequired = "Email must required";
const emailErrorSintax = "Must be a valid email";
const emailSintax = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type IForm = {
  name: (value: string) => string;
  email: (value: string) => string;
};

type IFormError = {
  name: string[];
  email: string[];
};

export const validationForm: IForm = {
  name: (value: string): string => {
    if (isRequired(value, "name")) return isRequired(value, "name");
    return "";
  },
  email: (value: string): string => {
    if (isRequired(value, "email")) return isRequired(value, "email");
    if (isValidEmail(value, "email")) return isValidEmail(value, "email");
    return "";
  },
};

export const errorsForm: IFormError = {
  name: [nameErrorRequired],
  email: [emailErrorRequired, emailErrorSintax],
};

function isRequired(value: string, key: keyof IForm): string {
  if (!value) return errorsForm[key][0];
  return "";
}

function isValidEmail(value: string, key: keyof IForm) {
  if (emailSintax.test(value)) return "";
  return errorsForm[key][1];
}
