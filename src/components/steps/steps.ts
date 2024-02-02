import "./steps.css";

const component = `
  <div class="steps">
    <p>Step 1 of 3</p>
    <div class="steps-balls">
      <span id="bo1" class="steps-ball active-ball">
        <span id="bi1" class="steps-ball-inside active-ball-inside"></span>
      </span>
      <span id="bo2" class="steps-ball">
        <span id="bi2" class="steps-ball-inside"></span>
      </span>
      <span id="bo3" class="steps-ball">
        <span id="bi3" class="steps-ball-inside"></span>
      </span>
    </div>
  </div>`;

export class Steps {
  private static instance: Steps;
  render = "";

  constructor() {
    this.render = component;
  }

  public static getInstance(): Steps {
    if (!Steps.instance) {
      Steps.instance = new Steps();
    }
    return Steps.instance;
  }

  public static addComponent(elem: HTMLElement) {
    const instance = Steps.getInstance();
    elem.innerHTML += instance.getRender;
  }

  get getRender() {
    return this.render;
  }

  initRender() {
    document.getElementById("bo1")?.classList.add("active-ball");
    for (let i = 2; i < 4; i++) {
      document.getElementById("bo" + i)?.classList.remove("active-ball");
      document.getElementById("bi" + i)?.classList.remove("active-ball-inside");
    }
  }

  newRender(step: number) {
    if (step === 1) {
      this.initRender();
    } else {
      document
        .getElementById("bo" + (step - 1))
        ?.classList.remove("active-ball");
      document.getElementById("bo" + step)?.classList.add("active-ball");
      document.getElementById("bi" + step)?.classList.add("active-ball-inside");
    }
  }
}
