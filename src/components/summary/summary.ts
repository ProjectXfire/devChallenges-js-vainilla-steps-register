import "./summary.css";

const component = `
  <article class="hide-step" id="summary">
    <p class="summary-title">Summary</p>
    <div class="summary-data">
      <p>Name:</p>
      <p id="d-name"></p>
    </div>
    <div class="summary-data">
      <p>Email:</p>
      <p id="d-email"></p>
    </div>
    <div class="summary-topics">
      <p>Topics</p>
      <ul id="d-topics" class="topics">
      </ul>
    </div>
  </article>`;

export class Summary {
  private static instance: Summary;
  render = "";

  constructor() {
    this.render = component;
  }

  public static getInstance(): Summary {
    if (!Summary.instance) {
      Summary.instance = new Summary();
    }
    return Summary.instance;
  }

  public static addComponent(elem: HTMLElement) {
    const instance = Summary.getInstance();
    elem.innerHTML += instance.getRender;
  }

  get getRender() {
    return this.render;
  }

  clearTopicsElements() {
    const ulContainer = document.getElementById("d-topics");
    const liElements = document.getElementsByTagName("li");
    const list = Array.from(liElements);
    for (let i = 0; i < list.length; i++) {
      ulContainer?.removeChild(list[i]);
    }
  }
}
