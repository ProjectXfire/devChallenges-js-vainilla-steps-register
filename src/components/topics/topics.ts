import { Register } from "../../states";
import "./topics.css";

const component = `
  <article id="topics" class="hide-step">
    <p class="topics__title">Which topics you are interested in?</p>
    <div class="topics__options">
      <button id="opt0" name="opt0" class="option">Software Development</button>
      <button id="opt1" name="opt1" class="option">User Experience</button>
      <button id="opt2" name="opt2" class="option">Graphic Design</button>
      <span id="topics-error" class="error"></span>
    </div>
  </article>`;

const errorTopics = "Please select at least one topic";

export class Topics {
  private static instance: Topics;
  private render = "";

  constructor() {
    this.render = component;
  }

  public static getInstance(): Topics {
    if (!Topics.instance) {
      Topics.instance = new Topics();
    }
    return Topics.instance;
  }

  public static addComponent(elem: HTMLElement): void {
    const instance = Topics.getInstance();
    elem.innerHTML += instance.getRender;
  }

  get getRender(): string {
    return this.render;
  }

  clearTopics(): void {
    for (let i = 0; i < 3; i++) {
      const opt = document.getElementById(`opt${i}`);
      opt?.classList.remove("selected");
    }
  }

  private onSelectOption = (e: MouseEvent): void => {
    const target = e.target as HTMLButtonElement;
    const elem = document.getElementById(target.name);
    const register = Register.getInstance();
    if (!elem) return;
    if (elem.classList.contains("selected")) {
      elem.classList.remove("selected");
      register.removeTopic(elem.innerText);
    } else {
      elem.classList.add("selected");
      register.setTopic = elem.innerText;
    }
  };

  hasSelectedATopic(): boolean {
    const register = Register.getInstance();
    const topics = register.getTopics();
    const topicsErrorElem = document.getElementById("topics-error");
    if (!topicsErrorElem) return false;
    if (topics.length === 0) {
      topicsErrorElem.innerHTML = errorTopics;
      return false;
    }
    topicsErrorElem.innerHTML = "";
    return true;
  }

  setupListerners(): void {
    const option0 = document.getElementById("opt0");
    const option1 = document.getElementById("opt1");
    const option2 = document.getElementById("opt2");
    option0?.addEventListener("click", this.onSelectOption);
    option1?.addEventListener("click", this.onSelectOption);
    option2?.addEventListener("click", this.onSelectOption);
  }
}
