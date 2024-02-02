import { Form, Steps, Summary, Topics } from "..";
import { Register } from "../../states";
import "./continue.css";

const component = `
  <div class="modal-action">
    <button id="continue" type="button">Continue</button>
  </div>
`;

export class Continue {
  private static instance: Continue;
  render = "";

  constructor() {
    this.render = component;
  }

  public static getInstance(): Continue {
    if (!Continue.instance) {
      Continue.instance = new Continue();
    }
    return Continue.instance;
  }

  public static addComponent(elem: HTMLElement): void {
    const instance = Continue.getInstance();
    elem.innerHTML += instance.getRender;
  }

  get getRender() {
    return this.render;
  }

  private showNextStep(currentStep: number) {
    const formElem = document.getElementById("form");
    const topicElem = document.getElementById("topics");
    const summaryElem = document.getElementById("summary");
    if (currentStep === 1) {
      formElem?.classList.remove("hide-step");
      topicElem?.classList.add("hide-step");
      summaryElem?.classList.add("hide-step");
    }
    if (currentStep === 2) {
      formElem?.classList.add("hide-step");
      topicElem?.classList.remove("hide-step");
      summaryElem?.classList.add("hide-step");
    }
    if (currentStep === 3) {
      formElem?.classList.add("hide-step");
      topicElem?.classList.add("hide-step");
      summaryElem?.classList.remove("hide-step");
    }
  }

  private changeButtonName(step: number) {
    const button = document.getElementById("continue");
    if (!button) return;
    if (step === 3) {
      button.innerText = "Confirm";
    } else {
      button.innerText = "Continue";
    }
  }

  private cleanRegisterData() {
    const register = Register.getInstance();
    const form = Form.getInstance();
    const topics = Topics.getInstance();
    const summary = Summary.getInstance();
    form.cleanForm();
    topics.clearTopics();
    summary.clearTopicsElements();
    register.cleanData();
    alert("✅ Success");
  }

  private validateNextStep(step: number): boolean {
    if (step === 1) {
      const form = Form.getInstance();
      return form.validateForm();
    }
    if (step === 2) {
      const topics = Topics.getInstance();
      return topics.hasSelectedATopic();
    }
    return true;
  }

  private showData(register: Register) {
    const dname = document.getElementById("d-name");
    const demail = document.getElementById("d-email");
    const dtopics = document.getElementById("d-topics");
    const { email, name } = register.getFormValues();
    const topics = register.getTopics();
    if (dname) dname.innerText = name;
    if (demail) demail.innerText = email;
    topics.forEach((topic) => {
      const li = document.createElement("li");
      li.innerText = topic;
      li.classList.add("topics__item");
      dtopics?.appendChild(li);
    });
  }

  private nextStep = (): void => {
    const register = Register.getInstance();
    const currentStep = register.getCurrentStep();
    if (!this.validateNextStep(currentStep)) return;
    register.nextStep();
    const nextStep = register.getCurrentStep();
    const steps = Steps.getInstance();
    steps.newRender(nextStep);
    this.changeButtonName(nextStep);
    this.showNextStep(nextStep);
    if (nextStep === 3) this.showData(register);
    if (nextStep === 1) this.cleanRegisterData();
  };

  setupListeners(): void {
    const action = document.getElementById("continue");
    action?.addEventListener("click", this.nextStep);
  }
}
