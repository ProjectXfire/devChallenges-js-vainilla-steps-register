import { type IForm, validationForm } from "../../helpers";
import { Register } from "../../states";
import "./form.css";

const component = `
  <article id="form">
    <p class="form-title">Register</p>
    <form id="user" class="form-input">
      <div class="form-group">
        <label>Name</label>
        <input id="name" value="" type="text" placeholder="enter your name" />
        <span id="name-error" class="error"></span>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input id="email" value="" type="text" placeholder="example@gmail.com" />
        <span id="email-error" class="error"></span>
      </div>
    </form>
  </article>
`;

interface IErrors {
  name: string;
  email: string;
}

export class Form {
  private static instance: Form;
  private render = "";
  private nameElem: HTMLInputElement | null = null;
  private emailElem: HTMLInputElement | null = null;
  private errors: IErrors = { name: "", email: "" };

  constructor() {
    this.render = component;
  }

  public static getInstance(): Form {
    if (!Form.instance) {
      Form.instance = new Form();
    }
    return Form.instance;
  }

  public static addComponent(elem: HTMLElement): void {
    const instance = Form.getInstance();
    elem.innerHTML += instance.getRender;
  }

  get getRender(): string {
    return this.render;
  }

  private handleName = (): void => {
    const register = Register.getInstance();
    if (!this.nameElem) return;
    register.setName = this.nameElem.value;
    const nameErrorElem = document.getElementById("name-error");
    if (!nameErrorElem) return;
    this.validateInput("name", this.nameElem.value, nameErrorElem);
  };

  private handleEmail = (): void => {
    const register = Register.getInstance();
    if (!this.emailElem) return;
    register.setEmail = this.emailElem.value;
    const emailErrorElem = document.getElementById("email-error");
    if (!emailErrorElem) return;
    this.validateInput("email", this.emailElem.value, emailErrorElem);
  };

  cleanForm() {
    if (this.nameElem) this.nameElem.value = "";
    if (this.emailElem) this.emailElem.value = "";
  }

  validateForm(): boolean {
    const register = Register.getInstance();
    const { name, email } = register.getFormValues();
    const nameErrorElem = document.getElementById("name-error");
    const emailErrorElem = document.getElementById("email-error");
    if (!nameErrorElem) return false;
    if (!emailErrorElem) return false;
    this.validateInput("name", name, nameErrorElem);
    this.validateInput("email", email, emailErrorElem);
    if (this.errors.name) return false;
    if (this.errors.email) return false;
    return true;
  }

  private validateInput(key: keyof IForm, value: string, element: HTMLElement) {
    const hasError = validationForm[key](value);
    element.innerHTML = hasError;
    this.errors[key] = hasError;
  }

  setupListener(): void {
    this.nameElem = document.getElementById("name") as HTMLInputElement;
    this.nameElem?.addEventListener("input", this.handleName);
    this.emailElem = document.getElementById("email") as HTMLInputElement;
    this.emailElem?.addEventListener("input", this.handleEmail);
  }

  removeListener() {
    this.nameElem?.removeEventListener("input", this.handleName);
    this.emailElem?.removeEventListener("input", this.handleEmail);
  }
}
